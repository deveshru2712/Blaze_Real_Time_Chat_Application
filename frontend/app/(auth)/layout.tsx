"use client";

import Loader from "@/components/Loader";
import authStore from "@/store/auth.store";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = authStore();

  if (isLoading) {
    <div className="w-screen h-screen flex justify-center items-center">
      <Loader />
    </div>;
  }

  if (!user) {
    return <>{children}</>;
  }
}
