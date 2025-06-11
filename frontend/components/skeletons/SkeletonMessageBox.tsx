import React from "react";

export default function MessageBoxSkeleton() {
  return (
    <div className="w-full px-2 h-20 rounded-md relative group animate-pulse">
      <div className="absolute inset-1 -z-10 bg-slate-400 rounded-md" />

      <div className="flex gap-5 inset-1.5 bg-white dark:bg-black absolute z-10 rounded-md px-2 py-2">
        <div className="w-12 h-12 bg-slate-300 dark:bg-slate-700 rounded-full flex-shrink-0" />

        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-24" />
            <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-12 hidden md:block" />
          </div>

          <div className="space-y-1">
            <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
}
