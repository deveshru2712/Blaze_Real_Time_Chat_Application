"use client";

import Loader from "@/components/Loader";
import authStore from "@/store/auth.store";
import socketStore from "@/store/socket.store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, authCheck } = authStore();
  const { setSocket, isProcessing, disconnect } = socketStore();
  const router = useRouter();

  // Initialize authentication and socket connection
  useEffect(() => {
    const initialize = async () => {
      await authCheck();
      setSocket();
      return () => {
        disconnect();
      };
    };
    initialize();
  }, [authCheck, setSocket, disconnect]);

  // Redirect if unauthenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/sign-in");
    }
  }, [user, isLoading, router]);

  // Show loader during initialization
  if (isLoading || !user || isProcessing) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
        <Loader />
        <div className="text-lg font-semibold">
          {isLoading
            ? "Checking authentication..."
            : isProcessing
            ? "Connecting to server..."
            : "Initializing application..."}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
