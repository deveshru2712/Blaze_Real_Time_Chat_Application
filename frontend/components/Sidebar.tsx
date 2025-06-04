import React from "react";
import MessageBox from "./MessageBox";

export default function Sidebar() {
  return (
    <div className="w-1/3 h-screen border-r px-2 py-1  hidden md:flex md:flex-col gap-1 ">
      <MessageBox
        username="devesh"
        latestMessage="hii there i am devesh "
        profileImg="https://avatar.iran.liara.run/public"
        time="11:28 AM"
      />
      <MessageBox
        username="yash"
        latestMessage="hii there i am yash chandra and i am going to become a software enginner"
        profileImg="https://avatar.iran.liara.run/public"
      />
    </div>
  );
}
