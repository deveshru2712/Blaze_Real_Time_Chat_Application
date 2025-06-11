"use client";

import Loader from "@/components/Loader";
import authStore from "@/store/auth.store";
import socketStore from "@/store/socket.store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, authCheck } = authStore();
  const { setSocket, isProcessing } = socketStore();
  const router = useRouter();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  useEffect(() => {
    setSocket();
  }, [setSocket]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/sign-in");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
        <Loader />
        <div className="dark:text-slate-300 text-slate-600 text-lg font-semibold">
          Connecting to the server.Please wait...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
