"use client";

import Loader from "@/components/Loader";
import authStore from "@/store/auth.store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, authCheck } = authStore();
  const router = useRouter();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/message");
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
    return <>{children}</>;
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Loader />
    </div>
  );
}
