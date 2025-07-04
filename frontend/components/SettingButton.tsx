"use client";
import React from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SettingsButton({ onClick, className }: SettingsButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onClick}
      className={className}
    >
      <Settings className="h-[1.2rem] w-[1.2rem] transition-all hover:rotate-90" />
      <span className="sr-only">Settings</span>
    </Button>
  );
}
