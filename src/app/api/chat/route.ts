// src/app/api/assist/route.ts
import OpenAI from "openai";
import { NextRequest } from "next/server";
import { StreamingTextResponse } from "ai";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    // Accept multiple shapes (useChat, custom, etc.)
    const lastFromArray =
      Array.isArray(body?.messages) && body.messages.length
        ? body.messages[body.messages.length - 1]
        : undefined;

    const userContentRaw =
      body?.prompt ??
      body?.input ??
      body?.message?.content ??
      lastFromArray?.content;

    const userContent =
      typeof userContentRaw === "string" ? userContentRaw.trim() : "";

    if (!userContent) {
      return new Response("Missing user content", { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    const assistantId = process.env.OPENAI_ASSISTANT_ID;
    if (!apiKey) return new Response("Missing OPENAI_API_KEY", { status: 500 });
    if (!assistantId)
      return new Response("Missing OPENAI_ASSISTANT_ID in .env.local", {
        status: 500,
      });

    const client = new OpenAI({ apiKey });

    // Auto-create a thread for each request
    const thread = await client.beta.threads.create();

    // Add the user's message
    await client.beta.threads.messages.create(thread.id, {
      role: "user",
      content: userContent,
    });

    // Run the assistant
    const run = await client.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId,
    });

    // Poll until complete
    const waitForRun = async () => {
      let status = run.status;
      while (["queued", "in_progress", "cancelling"].includes(status)) {
        const r = await client.beta.threads.runs.retrieve(thread.id, run.id);
        status = r.status;
        if (["failed", "cancelled", "expired"].includes(status)) {
          throw new Error(`Assistant run ${status}`);
        }
        await new Promise((res) => setTimeout(res, 800));
      }
    };
    await waitForRun();

    // Get the latest assistant message
    const messages = await client.beta.threads.messages.list(thread.id, {
      order: "desc",
      limit: 1,
    });

    let responseText = "No response received.";
    const latest = messages.data[0];
    if (latest?.content?.length) {
      for (const part of latest.content) {
        if (part.type === "text") {
          responseText = part.text.value;
        }
      }
    }

    responseText = responseText.replace(/【\d+:\d+†.*?】/g, "")

    // Stream back (single chunk)
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(responseText));
        controller.close();
      },
    });

    return new StreamingTextResponse(stream);
  } catch (err) {
    console.error(err);
    return new Response("Internal server error", { status: 500 });
  }
}
