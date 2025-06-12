import React from "react";

export default function MessageNavSkeleton() {
  return (
    <div className="w-full px-4 py-2 h-12 border border-b rounded-2xl mb-5 top-0 relative">
      <div className="flex">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
