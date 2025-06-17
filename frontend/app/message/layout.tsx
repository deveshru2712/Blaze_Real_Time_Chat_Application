"use client";
import Loader from "@/components/Loader";
import authStore from "@/store/auth.store";
import socketStore from "@/store/socket.store";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, authCheck } = authStore();
  const { setSocket, isProcessing, disconnect } = socketStore();
  const router = useRouter();
  const pathname = usePathname();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;

    const initialize = async () => {
      hasInitialized.current = true;
      await authCheck(router);
      setSocket();
    };

    initialize();

    return () => {
      disconnect();
    };
  }, [authCheck, disconnect, router, setSocket]);

  if (isLoading || (!user && pathname !== "/sign-in") || isProcessing) {
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
