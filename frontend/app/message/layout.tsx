"use client";

import Loader from "@/components/Loader";
import authStore from "@/store/auth.store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, authCheck } = authStore();
  const router = useRouter();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

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

  return <>{children}</>;
}
