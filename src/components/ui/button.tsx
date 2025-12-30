"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  disabled,
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(
        "rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2",
        variant === "primary" &&
          "bg-[#D4A853] text-white hover:bg-[#c49843] active:bg-[#b48833]",
        variant === "secondary" &&
          "bg-[#2D2D2D] text-white hover:bg-[#3D3D3D] active:bg-[#1D1D1D]",
        variant === "outline" &&
          "bg-white text-[#D4A853] border-2 border-[#D4A853] hover:bg-[#fdf8ef]",
        variant === "ghost" &&
          "bg-transparent text-[#666666] hover:bg-gray-100 active:bg-gray-200",
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-6 py-3 text-base",
        size === "lg" && "px-8 py-4 text-lg w-full",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
