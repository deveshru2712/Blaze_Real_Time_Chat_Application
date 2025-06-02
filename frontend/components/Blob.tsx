// this is AI generated
"use client";

import React, { useState, useEffect } from "react";

export default function AnimatedBlobs() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const blobs = [
    {
      id: 1,
      size: "w-96 h-96",
      color:
        "bg-gradient-to-br from-orange-400/15 to-red-400/10 dark:from-orange-400/8 dark:to-red-400/5",
      position: "top-10 left-10",
      animation: "animate-float-1",
      blur: "blur-3xl",
      duration: "12s",
      delay: "0s",
    },
    {
      id: 2,
      size: "w-64 h-64",
      color:
        "bg-gradient-to-tl from-red-400/20 to-orange-400/15 dark:from-red-400/12 dark:to-orange-400/8",
      position: "top-1/4 right-20",
      animation: "animate-float-2",
      blur: "blur-2xl",
      duration: "8s",
      delay: "0.5s",
    },
    {
      id: 3,
      size: "w-80 h-80",
      color:
        "bg-gradient-to-tr from-orange-400/12 to-red-400/8 dark:from-orange-400/6 dark:to-red-400/4",
      position: "bottom-20 left-1/4",
      animation: "animate-float-3",
      blur: "blur-3xl",
      duration: "10s",
      delay: "1s",
    },
    {
      id: 4,
      size: "w-52 h-52",
      color:
        "bg-gradient-to-bl from-red-400/18 to-orange-400/12 dark:from-red-400/10 dark:to-orange-400/6",
      position: "bottom-10 right-10",
      animation: "animate-float-4",
      blur: "blur-xl",
      duration: "14s",
      delay: "1.5s",
    },
    {
      id: 5,
      size: "w-72 h-72",
      color:
        "bg-gradient-to-r from-orange-400/10 to-red-400/15 dark:from-orange-400/5 dark:to-red-400/8",
      position: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
      animation: "animate-float-5",
      blur: "blur-3xl",
      duration: "9s",
      delay: "2s",
    },
    {
      id: 6,
      size: "w-40 h-40",
      color:
        "bg-gradient-to-t from-red-400/25 to-orange-400/18 dark:from-red-400/15 dark:to-orange-400/10",
      position: "top-3/4 right-1/3",
      animation: "animate-float-6",
      blur: "blur-xl",
      duration: "7s",
      delay: "2.5s",
    },
    {
      id: 7,
      size: "w-28 h-28",
      color:
        "bg-gradient-to-br from-orange-400/22 to-red-400/18 dark:from-orange-400/12 dark:to-red-400/10",
      position: "top-1/3 left-1/5",
      animation: "animate-float-2",
      blur: "blur-lg",
      duration: "11s",
      delay: "3s",
    },
    {
      id: 8,
      size: "w-36 h-36",
      color:
        "bg-gradient-to-l from-red-400/15 to-orange-400/20 dark:from-red-400/8 dark:to-orange-400/12",
      position: "bottom-1/3 right-1/4",
      animation: "animate-float-1",
      blur: "blur-2xl",
      duration: "13s",
      delay: "3.5s",
    },
    {
      id: 9,
      size: "w-20 h-20",
      color:
        "bg-gradient-to-tl from-orange-400/30 to-red-400/25 dark:from-orange-400/18 dark:to-red-400/15",
      position: "top-2/3 left-2/3",
      animation: "animate-float-4",
      blur: "blur-md",
      duration: "6s",
      delay: "4s",
    },
    {
      id: 10,
      size: "w-44 h-44",
      color:
        "bg-gradient-to-tr from-red-400/16 to-orange-400/12 dark:from-red-400/9 dark:to-orange-400/6",
      position: "top-1/6 right-1/2",
      animation: "animate-float-5",
      blur: "blur-xl",
      duration: "15s",
      delay: "4.5s",
    },
  ];

  // Don't render anything on server to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 via-transparent to-red-50/20 dark:from-orange-950/10 dark:via-transparent dark:to-red-950/10" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 via-transparent to-red-50/20 dark:from-orange-950/10 dark:via-transparent dark:to-red-950/10" />

      {/* Animated blobs */}
      {blobs.map((blob) => (
        <div
          key={blob.id}
          className={`
            absolute rounded-full transition-all duration-1000 ease-out
            ${blob.size}
            ${blob.color}
            ${blob.position}
            ${blob.animation}
            ${blob.blur}
          `}
          style={{
            animationDelay: blob.delay,
            animationDuration: blob.duration,
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out",
          }}
        />
      ))}

      {/* Additional smooth floating elements */}
      <div
        className="absolute top-1/5 left-3/4 w-16 h-16 bg-gradient-to-br from-orange-400/15 to-red-400/10 dark:from-orange-400/8 dark:to-red-400/5 rounded-full blur-lg animate-float-2 transition-all duration-1000 ease-out"
        style={{ animationDelay: "2s", animationDuration: "8s" }}
      />

      <div
        className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-gradient-to-tl from-red-400/12 to-orange-400/15 dark:from-red-400/6 dark:to-orange-400/8 rounded-full blur-xl animate-float-3 transition-all duration-1000 ease-out"
        style={{ animationDelay: "1.5s", animationDuration: "10s" }}
      />

      <div
        className="absolute top-3/5 right-1/5 w-32 h-32 bg-gradient-to-tr from-orange-400/8 to-red-400/12 dark:from-orange-400/4 dark:to-red-400/6 rounded-full blur-2xl animate-float-4 transition-all duration-1000 ease-out"
        style={{ animationDelay: "3s", animationDuration: "12s" }}
      />
    </div>
  );
}
