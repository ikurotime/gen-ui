"use client";
import { Message as TypeMessage } from "ai";
import Message from "./message";
import { useEffect } from "react";

export default function ChatMessages({
  messages = [],
}: {
  messages: TypeMessage[];
}) {
  useEffect(() => {
    const messages = document.getElementById("messages");
    messages?.scrollTo(0, messages.scrollHeight);
    return () => {
      messages?.scrollTo(0, messages.scrollHeight);
    };
  }, [messages]);

  return (
    <div className="flex w-full h-full p-8 mb-24 overflow-auto items-center ">
      <div className="flex flex-col h-full mx-auto w-full max-w-3xl gap-4">
        {messages.map((message, index) => (
          <Message key={index} content={message.content} role={message.role} />
        ))}
      </div>
    </div>
  );
}
