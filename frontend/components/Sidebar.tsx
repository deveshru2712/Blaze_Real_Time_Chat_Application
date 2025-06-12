"use client";
import React, { useState, useEffect } from "react";
import MessageBox from "./MessageBox";
import { Input } from "./ui/input";
import api from "@/utils/Axios";
import SkeletonMessageBox from "./skeletons/SkeletonMessageBox";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const [username, setUsername] = useState("");
  const [userList, setUserList] = useState<User[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const router = useRouter();

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
    <div className="w-1/3 mt-5 h-screen border-r px-2 py-1 hidden md:flex md:flex-col gap-1">
      <form className="w-full flex items-center" onSubmit={onSubmitHandler}>
        <Input
          className="font-semibold"
          placeholder="Type your friend name here .."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </form>

      {isFetching ? (
        <SkeletonMessageBox />
      ) : userList.length > 0 ? (
        userList.map((item) => (
          <MessageBox
            onClick={() => router.push(`user/${item.id}`)}
            key={item.id}
            profileImg={"https://avatar.iran.liara.run/public"}
            username={item.username}
            latestMessage="hii there"
            time="11:29 AM"
          />
        ))
      ) : (
        <div className="font-semibold text-center my-10">
          Start messaging your friend...
        </div>
      )}
    </div>
  );
}
