"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

interface GridPatternProps {
  squares?: [number, number][];
  className?: string;
}

export function GridPattern({ squares = [], className }: GridPatternProps) {
  return (
    <svg
      className={cn("absolute inset-0 h-full w-full fill-brand-navy/10", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="grid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      {squares.map(([x, y], i) => (
        <rect
          key={i}
          width="4"
          height="4"
          x={x * 40}
          y={y * 40}
          fill="currentColor"
          className="fill-brand-orange/20"
        />
      ))}
    </svg>
  );
} 