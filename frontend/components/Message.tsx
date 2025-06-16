"use client";
import { Send } from "lucide-react";
import { Input } from "./ui/input";
import MessageBubble from "./MessageBubble";
import SkeletonBubble from "./skeletons/SkeletonBubble";
import React, { useEffect } from "react";
import MessageNav from "./MessageNav";
import messageStore from "@/store/message.store";
import authStore from "@/store/auth.store";
import socketStore from "@/store/socket.store";
import { useRouter } from "next/navigation";

export default function Message({ User }: MessageProps) {
  const {
    isPending,
    messageArr,
    message,
    setMessage,
    fetchingMessage,
    sendMessage,
    setMessageArr,
  } = messageStore();
  const { socket } = socketStore();
  const { user: currentUser } = authStore();
  const router = useRouter();

  // Fetch messages when user changes
  useEffect(() => {
    if (User?.id) {
      fetchingMessage(User.id);
    }
  }, [User?.id, fetchingMessage]);

  // Socket message listener with proper cleanup
  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (messageData: Message) => {
      // Check if message already exists to prevent duplicates
      if (!messageArr.some((msg) => msg.id === messageData.id)) {
        setMessageArr([...messageArr, messageData]);
      }
    };

    socket.on("receive-message", handleReceiveMessage);

    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, [socket, messageArr, setMessageArr]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!currentUser) {
      router.replace("/sign-in");
    }
  }, [currentUser, router]);

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedMessage = message.trim();

    if (!trimmedMessage || !User?.id || isPending || !socket) return;

    try {
      sendMessage(User.id, trimmedMessage, socket);
      console.log(trimmedMessage);
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="h-full flex flex-col mx-6 py-4">
      <div className="flex-1 flex flex-col gap-1 overflow-y-auto">
        {User && <MessageNav user={User} />}

        {/* Message bubbles */}
        {isPending && messageArr.length === 0 ? (
          // Initial loading state
          <>
            <SkeletonBubble isMyMessage={false} />
            <SkeletonBubble isMyMessage={true} />
            <SkeletonBubble isMyMessage={false} />
          </>
        ) : messageArr.length > 0 ? (
          messageArr.map((msg) => (
            <MessageBubble
              key={msg.id}
              isMine={msg.senderId == currentUser.id}
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

      {/* Message input */}
      <div className="w-full mt-4">
        <h2>currentUser:{currentUser.username}</h2>
        <form
          onSubmit={onSubmitHandler}
          className="w-full flex items-center gap-1"
        >
          <Input
            placeholder="Type here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isPending}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSubmitHandler(
                  e as unknown as React.FormEvent<HTMLFormElement>
                );
              }
            }}
          />
          <button
            type="submit"
            disabled={isPending || !message.trim()}
            className="relative p-2 rounded-md overflow-hidden group cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
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
