import Image from "next/image";
import React from "react";

const MessageNav = () => {
  return (
    <div className="w-full px-4 py-2 h-12 border border-b rounded-2xl mb-5 top-0 relative">
      <div className="flex">
        <div className="flex items-center gap-3">
          <Image
            src="https://avatar.iran.liara.run/public"
            alt="profile_image"
            height={32}
            width={32}
            className="rounded-full"
          />
          <div className="text-lg font-medium cursor-pointer">username</div>
        </div>
      </div>
    </div>
  );
};

export default MessageNav;
