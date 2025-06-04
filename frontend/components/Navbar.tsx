import Link from "next/link";
import React from "react";
import { Toggle } from "./Toggle";

export default function Navbar() {
  return (
    <div className="w-full p-6 relative z-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold hover:bg-gradient-to-r hover:from-yellow-400 hover:via-orange-400 hover:to-red-600 bg-transparent hover:bg-clip-text hover:text-transparent cursor-pointer transition-all duration-500">
            <Link href={"/"}>
              Blaze <span className="text-black">🔥</span>
            </Link>
          </h1>
        </div>
        <div>
          <Toggle />
        </div>
      </div>
    </div>
  );
}
