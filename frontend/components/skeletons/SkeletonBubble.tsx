import React from "react";

interface SkeletonBubbleProps {
  isMyMessage: boolean;
}

export default function SkeletonBubble({ isMyMessage }: SkeletonBubbleProps) {
  return (
    <div
      className={`flex ${
        isMyMessage ? "justify-start" : " justify-end"
      } mb-6 px-4`}
    >
      <div
        className={`flex items-end gap-3 w-1/2 ${
          isMyMessage ? "flex-row" : "flex-row-reverse"
        }`}
      >
        {/* message */}
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-full animate-pulse ${
            isMyMessage ? "bg-orange-300" : "bg-red-300"
          }`}
        ></div>
        <div className="flex flex-col gap-1 w-full">
          <div
            className={`
            px-4 py-3 rounded-2xl shadow-sm
            ${
              isMyMessage
                ? "bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-br-md"
                : "bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-md"
            }
            `}
          >
            <div className="space-y-2">
              <div
                className={`h-4 rounded-full animate-pulse ${
                  isMyMessage ? "bg-white/30" : "bg-gray-300"
                }`}
                style={{ width: Math.random() * 40 + 60 + "%" }}
              ></div>

              {Math.random() > 0.5 && (
                <div
                  className={`h-4 rounded-full animate-pulse ${
                    isMyMessage ? "bg-white/30" : "bg-gray-300"
                  }`}
                  style={{ width: Math.random() * 60 + 40 + "%" }}
                ></div>
              )}
            </div>
          </div>
          {/* Timestamp */}
          <div className={`text-xs text-gray-500 px-2 text-right `}>
            <div
              className={`h-3 w-12 bg-gray-300 rounded animate-pulse inline-block`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
