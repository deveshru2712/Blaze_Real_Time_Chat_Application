"use client";
import Link from "next/link";
import React from "react";
import { Toggle } from "./Toggle";
import { SettingsButton } from "./SettingButton";
import authStore from "@/store/auth.store";

export default function Navbar() {
  const { user } = authStore();

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
          <div className="flex items-center gap-5">
            {user && (
              <SettingsButton className="opacity-100 p-2 outline rounded-md" />
            )}
            <Toggle />
          </div>
        </div>
      </div>
    </div>
  );
}
