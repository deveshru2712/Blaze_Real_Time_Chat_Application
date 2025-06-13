"use client";
import { Send } from "lucide-react";
import { Input } from "./ui/input";
import MessageBubble from "./MessageBubble";
import SkeletonBubble from "./skeletons/SkeletonBubble";
import React, { useEffect } from "react";
import MessageNav from "./MessageNav";
import messageStore from "@/store/message.store";

export default function Message({ receiverId }: MessageProps) {
  const {
    isPending,
    fetchingMessage,
    message,
    setMessage,
    receiverUser,
    messageArr,
    // sendingMessage,
  } = messageStore();

  useEffect(() => {
    fetchingMessage(receiverId);
  }, [fetchingMessage, receiverId]);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (!message.trim()) return;

    // await sendingMessage(receiverId, message);
  };

  return (
    <div className="h-full flex flex-col mx-6 py-4">
      <div className="flex-1 flex-col flex gap-1">
        {receiverUser && <MessageNav user={receiverUser} />}

        {/* message bubble */}
        {isPending && messageArr.length === 0 ? (
          // Show skeleton only when initially loading messages
          <>
            <SkeletonBubble isMyMessage={false} />
            <SkeletonBubble isMyMessage={true} />
            <SkeletonBubble isMyMessage={false} />
          </>
        ) : messageArr.length > 0 ? (
          messageArr.map((msg, index) => (
            <MessageBubble
              key={msg.id || index}
              isMine={msg.senderId === "currentUserId"}
              message={msg.content}
            />
          ))
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <Send className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                No messages yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Start a conversation by sending a message
              </p>
            </div>
          </div>
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
            disabled={isPending}
          />
          <button
            type="submit"
            disabled={isPending || !message.trim()}
            className="relative p-2 rounded-md overflow-hidden group cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
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
