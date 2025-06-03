import React from "react";
import MessageBox from "./MessageBox";

export default function Sidebar() {
  return (
    <div className="w-1/3 h-screen border-r px-2 py-1">
      <MessageBox
        username="username"
        latestMessage="hii there"
        profileImg="https://avatar.iran.liara.run/public"
        time="11:28 AM"
      />
    </div>
  );
}
