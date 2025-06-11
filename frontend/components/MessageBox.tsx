import Image from "next/image";
import React from "react";

export default function MessageBox({
  username,
  profileImg,
  time,
  latestMessage,
}: MessageBoxProps) {
  return (
    <div className="w-full px-2 h-20 rounded-md cursor-pointer relative group">
      {/* gradient div */}

      <div className="absolute inset-1 -z-10 bg-slate-400 group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-red-400/90 rounded-md transition-colors duration-500" />

      <div className="flex gap-5 inset-1.5 bg-white dark:bg-black  absolute z-10 rounded-md px-2 py-2">
        <Image
          src={profileImg}
          alt="profile-image"
          height={48}
          width={48}
          className="object-contain"
        />
        <div className="w-full flex flex-col">
          <div className="flex justify-between">
            <h2 className="dark:text-white">{username}</h2>
            <span className="text-slate-400 hidden md:block">{time}</span>
          </div>
          <div className="dark:text-white/80">
            {latestMessage && latestMessage.length > 35
              ? `${latestMessage.slice(0, 35)}...`
              : latestMessage || ""}
          </div>
        </div>
      </div>
    </div>
  );
}
