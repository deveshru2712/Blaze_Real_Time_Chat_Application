import React from "react";

interface MessageBubbleProps {
  isMine: boolean;
  message?: string;
  time?: string;
}

export default function MessageBubble({
  isMine,
  message = "Sample message...",
  time = "11:28 AM",
}: MessageBubbleProps) {
  return (
    <div
      className={`flex ${isMine ? "justify-end" : "justify-start"} mb-6 px-4`}
    >
      <div
        className={`flex items-end gap-3 max-w-[70%] ${
          isMine ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Avatar */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full ${
            isMine ? "bg-orange-400" : "bg-red-400"
          }`}
        >
          <div
            className={`w-full h-full rounded-full flex items-center justify-center text-white text-sm font-medium ${
              isMine
                ? "bg-gradient-to-br from-orange-400 to-orange-500"
                : "bg-gradient-to-br from-red-400 to-red-500"
            }`}
          >
            {isMine ? "Me" : "U"}
          </div>
        </div>

        {/* Message Bubble */}
        <div className="flex flex-col gap-1">
          <div
            className={`
            px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md
            ${
              isMine
                ? "bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-br-md"
                : "bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
            }
            `}
          >
            <div className="text-base leading-relaxed">{message}</div>
          </div>

          {/* Timestamp */}
          <div
            className={`text-xs text-gray-500 dark:text-gray-400 px-2 ${
              isMine ? "text-right" : "text-left"
            }`}
          >
            {time}
          </div>
        </div>
      </div>
    </div>
  );
}
