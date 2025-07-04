"use client";
import authStore from "@/store/auth.store";
import Loader from "@/components/Loader";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { authCheck, isLoading, user } = authStore();
  const router = useRouter();
  const pathname = usePathname();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;

    const initialize = async () => {
      hasInitialized.current = true;
      await authCheck(router);
    };

    initialize();
  }, [authCheck, router]);
  if (isLoading || (!user && pathname !== "/sign-in")) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
        <Loader />
        <div className="text-lg font-semibold">
          {isLoading
            ? "Checking authentication..."
            : "Initializing application..."}
        </div>
      </div>
    );
  }
  return <>{children}</>;
}
