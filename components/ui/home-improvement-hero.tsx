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
    <section
      className={cn(
        "relative flex flex-col items-center justify-center w-full overflow-hidden",
        "min-h-[90vh] sm:min-h-[85vh] md:min-h-[80vh] py-16 md:py-20",
        "bg-gradient-to-b from-white to-gray-50",
        className
      )}
      {...props}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-orange/5 to-transparent opacity-20" />
      </div>
      
      {/* Content container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
} 