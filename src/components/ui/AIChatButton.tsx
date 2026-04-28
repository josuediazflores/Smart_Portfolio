"use client";

import { useState } from "react";
import { Bot } from "lucide-react";
import AIChatBox from "./AIChatBox";

export default function AIChatButton() {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setChatBoxOpen(true)}
        aria-label="Open AI chat"
        title="Open AI chat"
        className="flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary hover:text-primary"
      >
        <Bot size={22} />
      </button>
      <AIChatBox
        open={chatBoxOpen}
        onClose={() => setChatBoxOpen(false)}
      />
    </>
  );
}
