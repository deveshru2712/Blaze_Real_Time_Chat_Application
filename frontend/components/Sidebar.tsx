"use client";
import React, { useState, useEffect } from "react";
import MessageBox from "./MessageBox";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import api from "@/utils/Axios";
import MessageBoxSkeleton from "./skeletons/SkeletonMessageBox";

export default function Sidebar() {
  const [username, setUsername] = useState("");
  const [userList, setUserList] = useState<User[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  // Debounced search effect
  useEffect(() => {
    if (!username.trim()) {
      setUserList([]);
      setIsFetching(false);
      return;
    }

    setIsFetching(true);

    // Debounce the actual API call
    const timeoutId = setTimeout(async () => {
      try {
        const response = await api(`/user`, {
          params: { username: username.trim() },
        });

        setUserList(response.data.users);
        console.log(response.data.users);
      } catch (error) {
        setUserList([]);
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    }, 500);

    // Cleanup timeout if username changes before 500ms
    return () => clearTimeout(timeoutId);
  }, [username]);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="w-1/3 h-screen border-r px-2 py-1 hidden md:flex md:flex-col gap-1">
      <form className="w-full flex items-center" onSubmit={onSubmitHandler}>
        <Input
          className="font-semibold"
          placeholder="Type your friend name here .."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          type="submit"
          className="relative p-2 rounded-md overflow-hidden group cursor-pointer flex items-center justify-center"
        >
          <div className="absolute inset-x-[5px] inset-y-[5px] bg-slate-400 dark:bg-white/80 rounded-md group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-red-400 transition-all duration-300" />
          <div className="relative z-10 p-1.5 bg-white dark:bg-black rounded-sm group-hover:bg-opacity-0 transition-colors duration-300 flex items-center justify-center">
            <Search className="w-4 h-4 text-gray-700 dark:text-white/80 group-hover:text-orange-400 dark:group-hover:text-orange-400 transition-colors duration-300" />
          </div>
        </button>
      </form>

      {isFetching ? (
        <MessageBoxSkeleton />
      ) : userList.length > 0 ? (
        userList.map((item) => (
          <MessageBox
            key={item.id}
            profileImg={"https://avatar.iran.liara.run/public"}
            username={item.username}
            latestMessage="hii there"
            time="11:29 AM"
          />
        ))
      ) : (
        <div className="text-slate-700 font-semibold text-center my-10">
          Start messaging your friend...
        </div>
      )}
    </div>
  );
}
