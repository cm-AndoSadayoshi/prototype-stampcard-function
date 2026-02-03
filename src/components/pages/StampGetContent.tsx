"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Star, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { PageContentProps } from "@/types";

export function StampGetContent({ basePath }: PageContentProps) {
  const [count, setCount] = useState(0);
  const earnedStamps = 5;
  const previousTotal = 68;
  const newTotal = previousTotal + earnedStamps;

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev < earnedStamps) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-full bg-gradient-to-b from-[#10B981] to-[#059669] flex flex-col items-center justify-center p-6">
      {/* スタンプアイコン */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="relative"
      >
        {/* グロー効果 */}
        <motion.div
          className="absolute inset-0 w-32 h-32 bg-white rounded-full blur-2xl opacity-30"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg relative">
          <Star className="w-16 h-16 text-[#10B981] fill-[#10B981]" />
        </div>
      </motion.div>

      {/* 獲得ポイント表示 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mt-8"
      >
        <p className="text-white/80 text-lg">獲得スタンプ</p>
        <AnimatePresence mode="wait">
          <motion.div
            key={count}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-baseline justify-center gap-2"
          >
            <span className="text-7xl font-bold text-white">+{count}</span>
            <span className="text-2xl text-white/80">pt</span>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* 累計ポイントカード */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full mt-8"
      >
        <Card className="text-center py-6">
          <div className="flex items-center justify-center gap-2 text-[#10B981] mb-2">
            <Check className="w-5 h-5" />
            <span className="font-medium">スタンプ付与完了</span>
          </div>

          <div className="flex items-center justify-center gap-4 my-4">
            <div className="text-center">
              <p className="text-xs text-gray-500">以前</p>
              <p className="text-2xl font-bold text-gray-400">{previousTotal}</p>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="text-2xl text-[#10B981]"
            >
              →
            </motion.div>
            <div className="text-center">
              <p className="text-xs text-gray-500">現在</p>
              <motion.p
                className="text-3xl font-bold text-[#10B981]"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ delay: 1, duration: 0.3 }}
              >
                {newTotal}
              </motion.p>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            Platinumまであと <span className="font-bold text-[#D4A853]">27pt</span>
          </p>
        </Card>
      </motion.div>

      {/* ホームに戻るボタン */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="w-full mt-6"
      >
        <Link href={`${basePath}/home`}>
          <Button variant="secondary" size="lg" className="bg-white text-[#10B981] hover:bg-gray-100">
            ホームに戻る
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
