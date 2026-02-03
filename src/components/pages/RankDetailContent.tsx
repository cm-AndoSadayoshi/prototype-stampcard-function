"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Crown, Star, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ranks, mockUser } from "@/lib/data";
import { PageContentProps } from "@/types";

export function RankDetailContent({ basePath }: PageContentProps) {
  return (
    <div className="min-h-full bg-[#FAFAF8]">
      {/* ヘッダー */}
      <div className="sticky top-0 bg-white border-b border-gray-100 z-10">
        <div className="flex items-center h-12 px-4">
          <Link href={`${basePath}/home`} className="p-1 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="font-bold text-gray-800 ml-2">ランク特典</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* 現在のランク表示 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="text-center py-4">
            <p className="text-sm text-gray-500 mb-2">現在のランク</p>
            <div className="flex items-center justify-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: ranks.find(r => r.id === mockUser.currentRank)?.color }}
              >
                <Star className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">
                {ranks.find(r => r.id === mockUser.currentRank)?.name}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              累計 <span className="font-bold text-[#D4A853]">{mockUser.currentStamps}pt</span>
            </p>
          </Card>
        </motion.div>

        {/* ランク一覧 */}
        <div className="space-y-3">
          {[...ranks].reverse().map((rank, index) => {
            const isCurrentRank = rank.id === mockUser.currentRank;
            const isAchieved = ranks.findIndex(r => r.id === rank.id) <= ranks.findIndex(r => r.id === mockUser.currentRank);

            return (
              <motion.div
                key={rank.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`relative overflow-hidden ${
                    isCurrentRank ? "ring-2 ring-[#D4A853]" : ""
                  }`}
                >
                  {isCurrentRank && (
                    <div className="absolute top-0 right-0 bg-[#D4A853] text-white text-xs px-2 py-1 rounded-bl-lg">
                      現在
                    </div>
                  )}

                  <div className="flex gap-4">
                    {/* ランクバッジ */}
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: isAchieved
                          ? `linear-gradient(135deg, ${rank.color}, ${rank.color}dd)`
                          : "#E5E5E5",
                      }}
                    >
                      {rank.id === "platinum" ? (
                        <Crown className="w-7 h-7 text-white" />
                      ) : (
                        <Star className="w-7 h-7 text-white" />
                      )}
                    </div>

                    {/* ランク情報 */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="font-bold text-lg"
                          style={{ color: isAchieved ? rank.color : "#9CA3AF" }}
                        >
                          {rank.name}
                        </span>
                        {isAchieved && (
                          <Check className="w-4 h-4 text-[#10B981]" />
                        )}
                      </div>

                      <p className="text-xs text-gray-500 mb-2">
                        {rank.requiredStamps}pt以上
                      </p>

                      {/* 特典リスト */}
                      <ul className="space-y-1">
                        {rank.benefits.map((benefit, i) => (
                          <li
                            key={i}
                            className={`text-sm flex items-center gap-2 ${
                              isAchieved ? "text-gray-700" : "text-gray-400"
                            }`}
                          >
                            <div
                              className="w-1.5 h-1.5 rounded-full"
                              style={{
                                backgroundColor: isAchieved ? rank.color : "#D1D5DB",
                              }}
                            />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* 注意書き */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-gray-400 text-center mt-4"
        >
          ランクは累計スタンプ数に応じて自動的に更新されます
        </motion.p>
      </div>
    </div>
  );
}
