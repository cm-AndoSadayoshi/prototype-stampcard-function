"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Gift, Calendar, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { benefits, getRankById } from "@/lib/data";

export default function BenefitsPage() {
  const availableBenefits = benefits.filter((b) => !b.used);
  const usedBenefits = benefits.filter((b) => b.used);

  return (
    <div className="min-h-full bg-[#FAFAF8]">
      {/* ヘッダー */}
      <div className="sticky top-0 bg-white border-b border-gray-100 z-10">
        <div className="flex items-center h-12 px-4">
          <Link href="/demo/home" className="p-1 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="font-bold text-gray-800 ml-2">特典一覧</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* 利用可能な特典 */}
        <section>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 mb-3"
          >
            <Gift className="w-5 h-5 text-[#D4A853]" />
            <h2 className="font-bold text-gray-800">利用可能な特典</h2>
            <span className="bg-[#D4A853] text-white text-xs px-2 py-0.5 rounded-full">
              {availableBenefits.length}
            </span>
          </motion.div>

          <div className="space-y-3">
            {availableBenefits.map((benefit, index) => {
              const rank = getRankById(benefit.rank);
              return (
                <motion.div
                  key={benefit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <div className="flex gap-4">
                      {/* アイコン */}
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${rank.color}20` }}
                      >
                        <Gift className="w-7 h-7" style={{ color: rank.color }} />
                      </div>

                      {/* 特典情報 */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-gray-800">{benefit.title}</h3>
                            <p className="text-sm text-gray-500">{benefit.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Calendar className="w-3 h-3" />
                            <span>〜{benefit.validUntil}</span>
                          </div>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: `${rank.color}20`,
                              color: rank.color,
                            }}
                          >
                            {rank.name}会員
                          </span>
                        </div>

                        <Button
                          variant="primary"
                          size="sm"
                          className="mt-3"
                        >
                          使用する
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* 使用済み特典 */}
        {usedBenefits.length > 0 && (
          <section>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 mb-3"
            >
              <Check className="w-5 h-5 text-gray-400" />
              <h2 className="font-bold text-gray-500">使用済み</h2>
            </motion.div>

            <div className="space-y-3">
              {usedBenefits.map((benefit, index) => {
                const rank = getRankById(benefit.rank);
                return (
                  <motion.div
                    key={benefit.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <Card className="opacity-60">
                      <div className="flex gap-4">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 bg-gray-100">
                          <Gift className="w-7 h-7 text-gray-400" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-gray-500 line-through">
                              {benefit.title}
                            </h3>
                            <span className="text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">
                              使用済み
                            </span>
                          </div>
                          <p className="text-sm text-gray-400">{benefit.description}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}

        {/* 空の状態 */}
        {benefits.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">利用可能な特典はありません</p>
            <p className="text-sm text-gray-400 mt-1">
              スタンプを貯めて特典をゲットしよう
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
