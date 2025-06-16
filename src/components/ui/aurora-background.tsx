"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  showRadialGradient?: boolean;
}

export function AuroraBackground({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col flex-1 items-center justify-center min-h-screen overflow-hidden bg-slate-950 py-12",
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 z-[-1] overflow-hidden bg-slate-950">
        <div
          className="absolute -inset-[10px] opacity-50"
          style={{
            background:
              "conic-gradient(from 230.29deg at 51.63% 52.16%, rgb(36, 0, 255) 0deg, rgb(0, 135, 255) 67.5deg, rgb(108, 39, 157) 198.75deg, rgb(24, 38, 163) 251.25deg, rgb(54, 103, 196) 301.88deg, rgb(105, 30, 255) 360deg)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute -inset-[10px] opacity-30"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgb(76, 0, 255), rgb(24, 38, 163), rgb(108, 39, 157), rgb(220, 38, 38), rgb(24, 38, 163))",
            filter: "blur(100px)",
          }}
        />
      </div>
      {showRadialGradient && (
        <div
          className="pointer-events-none absolute inset-0 z-[-1] h-full bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]"
        />
      )}
      {children}
    </div>
  );
}

export default AuroraBackground; 