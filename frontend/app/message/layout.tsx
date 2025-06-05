"use client";
import Loader from "@/components/Loader";
import authStore from "@/store/auth.store";
import { useRouter } from "next/navigation";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = authStore();

  const router = useRouter();

  if (!user && !isLoading) {
    router.push("/sign-in");
  } else if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  } else if (user && !isLoading) {
    return <>{children}</>;
  }
}
