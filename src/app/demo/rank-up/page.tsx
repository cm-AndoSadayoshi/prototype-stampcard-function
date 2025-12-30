"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Crown, Sparkles, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import confetti from "canvas-confetti";
import { getRankById } from "@/lib/data";

export default function RankUpPage() {
  const confettiTriggered = useRef(false);
  const newRank = getRankById("platinum");

  useEffect(() => {
    if (confettiTriggered.current) return;
    confettiTriggered.current = true;

    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ["#D4A853", "#E5E4E2", "#FFD700", "#FFFFFF"];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return (
    <div className="min-h-full bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* 背景のグロー効果 */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E5E4E2] rounded-full blur-[100px] opacity-20" />
      </motion.div>

      {/* RANK UP! テキスト */}
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", duration: 0.8, delay: 0.3 }}
        className="text-center relative z-10"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-6 h-6 text-[#D4A853]" />
          <Sparkles className="w-6 h-6 text-[#D4A853]" />
        </div>
        <motion.h1
          className="text-4xl font-bold text-white"
          animate={{
            textShadow: [
              "0 0 20px rgba(212, 168, 83, 0.5)",
              "0 0 40px rgba(212, 168, 83, 0.8)",
              "0 0 20px rgba(212, 168, 83, 0.5)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          RANK UP!
        </motion.h1>
      </motion.div>

      {/* ランクバッジ */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 1, delay: 0.6 }}
        className="relative mt-8"
      >
        {/* グロー効果 */}
        <motion.div
          className="absolute inset-0 rounded-full blur-2xl"
          style={{ backgroundColor: newRank.color }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="w-40 h-40 rounded-full flex flex-col items-center justify-center relative"
          style={{
            background: `linear-gradient(135deg, ${newRank.color}, ${newRank.color}dd)`,
            boxShadow: `0 0 60px ${newRank.color}66`,
          }}
          animate={{
            boxShadow: [
              `0 0 40px ${newRank.color}44`,
              `0 0 80px ${newRank.color}88`,
              `0 0 40px ${newRank.color}44`,
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Crown className="w-16 h-16 text-white" />
          <span className="font-bold text-white text-xl mt-1">{newRank.name}</span>
        </motion.div>
      </motion.div>

      {/* 昇格メッセージ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="text-center mt-8"
      >
        <p className="text-white/60 text-sm">おめでとうございます！</p>
        <p className="text-white text-lg font-medium mt-1">
          <span className="text-[#D4A853]">Gold</span> から{" "}
          <span style={{ color: newRank.color }}>{newRank.name}</span> に昇格しました
        </p>
      </motion.div>

      {/* 特典カード */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="w-full mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-[#D4A853] flex items-center justify-center">
            <Gift className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-medium">新しい特典を獲得</p>
            <p className="text-white/60 text-sm">{newRank.name}会員限定</p>
          </div>
        </div>

        <ul className="space-y-2">
          {newRank.benefits.map((benefit, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8 + index * 0.1 }}
              className="flex items-center gap-2 text-white/90 text-sm"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4A853]" />
              {benefit}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* OKボタン */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="w-full mt-8"
      >
        <Link href="/demo/home">
          <Button size="lg" className="bg-white text-[#1a1a2e] hover:bg-gray-100">
            OK
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
