import React from "react";
import { useAppTheme } from "@/hooks/useTheme";

export default function MessageNavSkeleton() {
  const { classes } = useAppTheme();

  return (
    <div
      className={`w-full px-4 py-2 h-12 ${classes.border} border-b rounded-2xl mb-5 top-0 relative`}
    >
      <div className="flex items-center h-full">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-300/70 dark:bg-slate-600/50 rounded-full animate-pulse"></div>
          <div className="h-5 w-20 bg-slate-300/70 dark:bg-slate-600/50 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
