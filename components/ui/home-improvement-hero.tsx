"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import * as React from "react";

interface HomeImprovementHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function HomeImprovementHero({
  className,
  children,
  ...props
}: HomeImprovementHeroProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col flex-1 items-center justify-center min-h-[80vh] overflow-hidden py-12",
        className
      )}
      {...props}
    >
      {/* Content container */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
} 