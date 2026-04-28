import { cn } from "@/lib/utils";
import { Message, useChat } from "ai/react";
import { Bot, SendHorizonal, Trash, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { TextShimmer } from "@/components/ui/TextShimmer";
import { useEffect, useRef } from "react";

interface AIChatBoxProps {
  open: boolean;
  onClose: () => void;
}

const SUGGESTED_PROMPTS = [
  "What projects has Josue built?",
  "What's his tech stack?",
  "How can I contact him?",
];

export default function AIChatBox({ open, onClose }: AIChatBoxProps) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    append,
    isLoading,
    error,
  } = useChat();

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const lastMessageIsUser = messages[messages.length - 1]?.role === "user";

  return (
    <div
      role="dialog"
      aria-label="AI assistant"
      data-open={open}
      className={cn(
        "fixed bottom-0 right-0 z-50 mb-4 mr-4 w-[min(420px,calc(100vw-2rem))] p-1 transition-all duration-200 ease-out xl:right-36",
        open
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <div className="relative flex h-[600px] flex-col overflow-hidden rounded-2xl border bg-background shadow-2xl ring-1 ring-border">
        <header className="flex items-center justify-between gap-2 border-b bg-background/80 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Bot size={20} />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">AI Assistant</span>
              <span className="text-xs text-muted-foreground">
                Ask me about Josue
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setMessages([])}
              aria-label="Clear chat"
              title="Clear chat"
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Trash size={18} />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close chat"
              title="Close chat"
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        <div
          className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          ref={scrollRef}
        >
          {messages.map((message) => (
            <ChatMessage message={message} key={message.id} />
          ))}
          {isLoading && lastMessageIsUser && (
            <div className="flex items-end gap-2">
              <div className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-primary/10 text-primary">
                <Bot size={16} />
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-secondary px-3 py-2">
                <TextShimmer as="span" className="text-sm">
                  Thinking...
                </TextShimmer>
              </div>
            </div>
          )}
          {error && (
            <ChatMessage
              message={{
                id: "error",
                role: "assistant",
                content: `Error: ${String(error.message || error)}`,
              }}
            />
          )}
          {!error && messages.length === 0 && (
            <div className="flex h-full flex-col items-center gap-3 px-6 pt-10 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Bot size={28} />
              </div>
              <p className="text-lg font-semibold">
                Send a message to start the AI chat!
              </p>
              <p className="text-sm text-muted-foreground">
                You can ask the chatbot anything about me and it will find any
                relevant information.
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => append({ role: "user", content: prompt })}
                    className="rounded-full border bg-secondary/40 px-3 py-1.5 text-sm transition-colors hover:bg-secondary"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="border-t bg-background px-3 py-3"
        >
          <div className="flex items-center gap-2 rounded-2xl border bg-background pl-4 pr-1.5 py-1 focus-within:ring-2 focus-within:ring-primary">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask anything"
              aria-label="Message input"
              className="grow bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
              ref={inputRef}
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={isLoading || input.length === 0}
              className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground"
            >
              <SendHorizonal size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface ChatMessageProps {
  message: Message;
}

function ChatMessage({ message: { role, content } }: ChatMessageProps) {
  const isAiMessage = role === "assistant";

  return (
    <div
      className={cn(
        "flex items-end gap-2",
        isAiMessage ? "justify-start" : "justify-end",
      )}
    >
      {isAiMessage && (
        <div className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-primary/10 text-primary">
          <Bot size={16} />
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
          isAiMessage
            ? "rounded-tl-sm bg-secondary text-foreground"
            : "rounded-tr-sm bg-primary text-primary-foreground",
        )}
      >
        <ReactMarkdown
          components={{
            a: ({ node, ref, ...props }) => (
              <Link
                {...props}
                href={props.href ?? ""}
                className="underline underline-offset-2 hover:opacity-80"
              />
            ),
            p: ({ node, ...props }) => (
              <p {...props} className="mt-2 first:mt-0" />
            ),
            ul: ({ node, ...props }) => (
              <ul
                {...props}
                className="mt-2 list-inside list-disc first:mt-0"
              />
            ),
            li: ({ node, ...props }) => <li {...props} className="mt-1" />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
