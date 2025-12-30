"use client";

import { motion } from "framer-motion";
import { Crown, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Rank } from "@/types";

interface RankBadgeProps {
  rank: Rank;
  size?: "sm" | "md" | "lg";
  showGlow?: boolean;
  className?: string;
}

export function RankBadge({ rank, size = "md", showGlow = false, className }: RankBadgeProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <motion.div
      className={cn("relative", className)}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", duration: 0.5 }}
    >
      {showGlow && (
        <motion.div
          className={cn(
            "absolute inset-0 rounded-full blur-xl opacity-30",
            sizeClasses[size]
          )}
          style={{ backgroundColor: rank.color }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
      <div
        className={cn(
          "rounded-full flex flex-col items-center justify-center",
          sizeClasses[size]
        )}
        style={{
          background: `linear-gradient(135deg, ${rank.color}, ${rank.color}dd)`,
          boxShadow: showGlow ? `0 0 30px ${rank.color}66` : undefined,
        }}
      >
        {rank.id === "platinum" ? (
          <Crown className={cn(iconSizes[size], "text-white")} />
        ) : (
          <Star className={cn(iconSizes[size], "text-white")} />
        )}
        <span className={cn("font-bold text-white mt-1", textSizes[size])}>
          {rank.name}
        </span>
      </div>
    </motion.div>
  );
}
