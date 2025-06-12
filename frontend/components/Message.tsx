"use client";
import { Send } from "lucide-react";
import { Input } from "./ui/input";
import MessageBubble from "./MessageBubble";
import SkeletonBubble from "./skeletons/SkeletonBubble";
import React, { useEffect, useState } from "react";
import socketStore from "@/store/socket.store";
import MessageNav from "./MessageNav";

export default function Message() {
  const [message, setMessage] = useState("");
  // const [messageArr, setMessageArr] = useState<>();
  const isLoading = false;
  const { socket, isProcessing } = socketStore();

  useEffect(() => {
    // retrieve message
  }, []);

  const onSubmitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim() || !socket || isProcessing) return;
    try {
      socket.emit("send-message", () => {
        // append the latest message in the message array for seeing the latest message
      });
    } catch (error) {
      console.log("An error occurred while sending message:", error);
    }
  };

  return (
    <div className="h-full flex flex-col mx-6 py-4">
      <div className="flex-1 flex-col flex gap-1">
        <MessageNav />
        {/* message bubble  */}
        {isLoading ? (
          <>
            <SkeletonBubble isMyMessage={false} />
            <SkeletonBubble isMyMessage={true} />
            <SkeletonBubble isMyMessage={false} />
          </>
        ) : (
          <>
            <MessageBubble isMine={true} />
            <MessageBubble isMine={false} />
            <MessageBubble isMine={true} />
          </>
        )}
      </div>
      <div className="w-full">
        <form
          onSubmit={onSubmitHandler}
          className="w-full flex items-center gap-1"
        >
          <Input
            placeholder="Type here..."
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="relative p-2 rounded-md overflow-hidden group cursor-pointer flex items-center justify-center"
          >
            <div className="absolute inset-x-[5px] inset-y-[5px] bg-slate-400 dark:bg-white/80 rounded-md group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-red-400 transition-all duration-300" />
            <div className="relative z-10 p-1.5 bg-white dark:bg-black rounded-sm group-hover:bg-opacity-0 transition-colors duration-300 flex items-center justify-center">
              <Send className="w-4 h-4 text-gray-700 dark:text-white/80 group-hover:text-orange-400 dark:group-hover:text-orange-400 transition-colors duration-300" />
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}
