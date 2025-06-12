import React from "react";
import { useAppTheme } from "@/hooks/useTheme";

export default function SkeletonMessageBox() {
  const { classes } = useAppTheme();

  return (
    <div className="w-full px-2 h-20 rounded-md relative group animate-pulse">
      {/* Border background */}
      <div className="absolute inset-1 -z-10 bg-slate-400/50 rounded-md" />

      {/* Content container */}
      <div
        className={`flex gap-5 inset-1.5 ${classes.cardBg} absolute z-10 rounded-md px-2 py-2 ${classes.border} border`}
      >
        {/* Profile image skeleton */}
        <div className="w-12 h-12 bg-slate-300/70 dark:bg-slate-600/50 rounded-full flex-shrink-0 animate-pulse" />

        <div className="w-full flex flex-col justify-center gap-2">
          <div className="flex justify-between items-start">
            {/* Username skeleton */}
            <div className="h-4 bg-slate-300/70 dark:bg-slate-600/50 rounded w-24 animate-pulse" />
            {/* Time skeleton */}
            <div className="h-3 bg-slate-300/60 dark:bg-slate-600/40 rounded w-12 hidden md:block animate-pulse" />
          </div>

          {/* Message skeleton */}
          <div className="h-3 bg-slate-300/60 dark:bg-slate-600/40 rounded w-3/4 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
