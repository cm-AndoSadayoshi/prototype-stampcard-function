"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { QrCode, Gift, ChevronRight, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RankBadge } from "@/components/demo/rank-badge";
import { CircularProgress } from "@/components/demo/circular-progress";
import { mockUser, getRankById, getNextRank, getStampsToNextRank, getProgressPercentage } from "@/lib/data";
import { PageContentProps } from "@/types";

export function HomeContent({ basePath }: PageContentProps) {
  const currentRank = getRankById(mockUser.currentRank);
  const nextRank = getNextRank(mockUser.currentRank);
  const stampsToNext = getStampsToNextRank(mockUser.currentStamps, nextRank);
  const progressPercentage = getProgressPercentage(mockUser.currentStamps, currentRank, nextRank);

  return (
    <div className="p-4 space-y-4">
      {/* ヘッダー */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-2"
      >
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-gray-500" />
        </div>
        <div>
          <p className="font-bold text-gray-800">{mockUser.name} 様</p>
          <p className="text-xs text-gray-500">会員No: {mockUser.memberId}</p>
        </div>
      </motion.div>

      {/* メインカード - スタンプ状況 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="text-center py-6">
          <div className="flex flex-col items-center">
            <RankBadge rank={currentRank} size="md" showGlow />

            <div className="mt-4">
              <CircularProgress
                value={mockUser.currentStamps}
                max={nextRank?.requiredStamps || 100}
                size={160}
                color={currentRank.color}
              >
                <div className="text-center">
                  <motion.span
                    className="text-4xl font-bold text-gray-800"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    {mockUser.currentStamps}
                  </motion.span>
                  <span className="text-lg text-gray-500 ml-1">pt</span>
                </div>
              </CircularProgress>
            </div>

            {nextRank && (
              <motion.div
                className="mt-4 w-full px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>{currentRank.name}</span>
                  <span>{nextRank.name}</span>
                </div>
                <Progress
                  value={progressPercentage}
                  max={100}
                  size="md"
                  color={currentRank.color}
                />
                <p className="text-sm text-gray-600 mt-2">
                  あと <span className="font-bold text-[#D4A853]">{stampsToNext}pt</span> で {nextRank.name}!
                </p>
              </motion.div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* クイックアクション */}
      <motion.div
        className="grid grid-cols-2 gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Link href={`${basePath}/qr-code`}>
          <Button variant="outline" className="w-full h-14 flex-col gap-1">
            <QrCode className="w-5 h-5" />
            <span className="text-xs">QRコード</span>
          </Button>
        </Link>
        <Link href={`${basePath}/benefits`}>
          <Button variant="outline" className="w-full h-14 flex-col gap-1">
            <Gift className="w-5 h-5" />
            <span className="text-xs">特典を見る</span>
          </Button>
        </Link>
      </motion.div>

      {/* ランク特典リンク */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Link href={`${basePath}/rank-detail`}>
          <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${currentRank.color}20` }}
                >
                  <Gift className="w-5 h-5" style={{ color: currentRank.color }} />
                </div>
                <div>
                  <p className="font-medium text-gray-800">ランク特典を確認</p>
                  <p className="text-xs text-gray-500">各ランクの特典内容をチェック</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>
        </Link>
      </motion.div>

      {/* 現在のランク特典 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <p className="text-sm font-medium text-gray-500 mb-3">{currentRank.name}会員特典</p>
          <ul className="space-y-2">
            {currentRank.benefits.map((benefit, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-2 text-sm text-gray-700"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: currentRank.color }}
                />
                {benefit}
              </motion.li>
            ))}
          </ul>
        </Card>
      </motion.div>
    </div>
  );
}
