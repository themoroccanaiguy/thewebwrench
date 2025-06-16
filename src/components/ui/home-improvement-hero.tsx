"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { GridPattern } from "@/components/ui/grid-pattern";

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
        "relative flex flex-col flex-1 items-center justify-center min-h-screen overflow-hidden py-12",
        className
      )}
      {...props}
    >
      {/* Main background with construction-themed gradient */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #1a365d 0%, #2d3748 100%)",
          }}
        />
        
        {/* Grid Pattern with squares */}
        <GridPattern
          squares={[
            [4, 4],
            [5, 1],
            [8, 2],
            [5, 3],
            [5, 5],
            [10, 10],
            [12, 15],
            [15, 10],
            [10, 15],
            [15, 10],
            [10, 15],
            [15, 10],
          ]}
          className={cn(
            "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
          )}
        />

        {/* Construction tool icons as decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-16 h-16">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path d="M21.5,2.5 L21.5,2.5 C22.3284271,2.5 23,3.17157288 23,4 L23,4 C23,4.82842712 22.3284271,5.5 21.5,5.5 L21.5,5.5 C20.6715729,5.5 20,4.82842712 20,4 L20,4 C20,3.17157288 20.6715729,2.5 21.5,2.5 Z" fill="rgba(255, 255, 255, 0.3)"/>
              <path d="M17.5,6.5 L17.5,6.5 C18.3284271,6.5 19,7.17157288 19,8 L19,8 C19,8.82842712 18.3284271,9.5 17.5,9.5 L17.5,9.5 C16.6715729,9.5 16,8.82842712 16,8 L16,8 C16,7.17157288 16.6715729,6.5 17.5,6.5 Z" fill="rgba(255, 255, 255, 0.3)"/>
              <path d="M13.5,10.5 L13.5,10.5 C14.3284271,10.5 15,11.1715729 15,12 L15,12 C15,12.8284271 14.3284271,13.5 13.5,13.5 L13.5,13.5 C12.6715729,13.5 12,12.8284271 12,12 L12,12 C12,11.1715729 12.6715729,10.5 13.5,10.5 Z" fill="rgba(255, 255, 255, 0.3)"/>
              <path d="M9.5,14.5 L9.5,14.5 C10.3284271,14.5 11,15.1715729 11,16 L11,16 C11,16.8284271 10.3284271,17.5 9.5,17.5 L9.5,17.5 C8.67157288,17.5 8,16.8284271 8,16 L8,16 C8,15.1715729 8.67157288,14.5 9.5,14.5 Z" fill="rgba(255, 255, 255, 0.3)"/>
              <path d="M5.5,18.5 L5.5,18.5 C6.32842712,18.5 7,19.1715729 7,20 L7,20 C7,20.8284271 6.32842712,21.5 5.5,21.5 L5.5,21.5 C4.67157288,21.5 4,20.8284271 4,20 L4,20 C4,19.1715729 4.67157288,18.5 5.5,18.5 Z" fill="rgba(255, 255, 255, 0.3)"/>
            </svg>
          </div>
          <div className="absolute top-1/3 right-1/4 w-12 h-12">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path d="M14.7,6.3 C14.7,6.3 14.7,6.3 14.7,6.3 C15.1,6.7 15.1,7.3 14.7,7.7 L7.7,14.7 C7.3,15.1 6.7,15.1 6.3,14.7 C6.3,14.7 6.3,14.7 6.3,14.7 C5.9,14.3 5.9,13.7 6.3,13.3 L13.3,6.3 C13.7,5.9 14.3,5.9 14.7,6.3 Z" fill="rgba(255, 255, 255, 0.3)"/>
              <path d="M17.7,3.3 C17.7,3.3 17.7,3.3 17.7,3.3 C18.1,3.7 18.1,4.3 17.7,4.7 L4.7,17.7 C4.3,18.1 3.7,18.1 3.3,17.7 C3.3,17.7 3.3,17.7 3.3,17.7 C2.9,17.3 2.9,16.7 3.3,16.3 L16.3,3.3 C16.7,2.9 17.3,2.9 17.7,3.3 Z" fill="rgba(255, 255, 255, 0.3)"/>
            </svg>
          </div>
          <div className="absolute bottom-1/4 left-1/3 w-14 h-14">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path d="M12,2 L2,10 L4,10 L4,20 L20,20 L20,10 L22,10 L12,2 Z M18,18 L6,18 L6,11 L12,6 L18,11 L18,18 Z" fill="rgba(255, 255, 255, 0.3)"/>
              <path d="M10,14 L14,14 L14,18 L10,18 L10,14 Z" fill="rgba(255, 255, 255, 0.3)"/>
            </svg>
          </div>
          <div className="absolute bottom-1/3 right-1/3 w-10 h-10">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path d="M1.5,3.5 L22.5,3.5 L22.5,20.5 L1.5,20.5 L1.5,3.5 Z M3.5,5.5 L3.5,18.5 L20.5,18.5 L20.5,5.5 L3.5,5.5 Z" fill="rgba(255, 255, 255, 0.3)"/>
              <path d="M5.5,7.5 L5.5,9.5 L7.5,9.5 L7.5,7.5 L5.5,7.5 Z" fill="rgba(255, 255, 255, 0.3)"/>
              <path d="M9.5,7.5 L9.5,9.5 L11.5,9.5 L11.5,7.5 L9.5,7.5 Z" fill="rgba(255, 255, 255, 0.3)"/>
              <path d="M13.5,7.5 L13.5,9.5 L15.5,9.5 L15.5,7.5 L13.5,7.5 Z" fill="rgba(255, 255, 255, 0.3)"/>
              <path d="M17.5,7.5 L17.5,9.5 L19.5,9.5 L19.5,7.5 L17.5,7.5 Z" fill="rgba(255, 255, 255, 0.3)"/>
              <path d="M5.5,11.5 L5.5,13.5 L7.5,13.5 L7.5,11.5 L5.5,11.5 Z" fill="rgba(255, 255, 255, 0.3)"/>
              <path d="M9.5,11.5 L9.5,13.5 L11.5,13.5 L11.5,11.5 L9.5,11.5 Z" fill="rgba(255, 255, 255, 0.3)"/>
              <path d="M13.5,11.5 L13.5,13.5 L15.5,13.5 L15.5,11.5 L13.5,11.5 Z" fill="rgba(255, 255, 255, 0.3)"/>
              <path d="M17.5,11.5 L17.5,13.5 L19.5,13.5 L19.5,11.5 L17.5,11.5 Z" fill="rgba(255, 255, 255, 0.3)"/>
              <path d="M5.5,15.5 L5.5,17.5 L7.5,17.5 L7.5,15.5 L5.5,15.5 Z" fill="rgba(255, 255, 255, 0.3)"/>
              <path d="M9.5,15.5 L9.5,17.5 L11.5,17.5 L11.5,15.5 L9.5,15.5 Z" fill="rgba(255, 255, 255, 0.3)"/>
              <path d="M13.5,15.5 L13.5,17.5 L15.5,17.5 L15.5,15.5 L13.5,15.5 Z" fill="rgba(255, 255, 255, 0.3)"/>
              <path d="M17.5,15.5 L17.5,17.5 L19.5,17.5 L19.5,15.5 L17.5,15.5 Z" fill="rgba(255, 255, 255, 0.3)"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Radial gradient for depth */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(circle at 50% 200px, #1a365d, transparent 800px)",
        }}
      />

      {/* Content container */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}

export default HomeImprovementHero; 