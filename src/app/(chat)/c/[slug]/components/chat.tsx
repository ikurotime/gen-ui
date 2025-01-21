"use client";

import { useChat } from "ai/react";
import ChatInput from "./chat-input";
import ChatMessages from "./chat-messages";

export default function Chat() {
  const { messages, input, handleSubmit, handleInputChange } = useChat();
  return (
    <div className="flex flex-col w-full h-full items-center justify-between">
      <ChatMessages messages={messages} />
      <ChatInput
        input={input}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}
