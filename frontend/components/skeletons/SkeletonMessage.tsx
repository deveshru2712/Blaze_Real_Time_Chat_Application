import React from "react";
import MessageNav from "../MessageNav";

export default function SkeletonMessage() {
  return (
    <div className="h-full flex flex-col mx-6 py-4">
      <div className="flex-1 flex-col flex gap-1"></div>
      <div className="w-full">
        <MessageNav />
      </div>
    </div>
  );
}
