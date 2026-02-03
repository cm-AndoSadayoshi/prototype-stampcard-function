"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { mockUser } from "@/lib/data";
import { QRCodeSVG } from "qrcode.react";
import { PageContentProps } from "@/types";

export function QRCodeContent({ basePath }: PageContentProps) {
  return (
    <div className="min-h-full bg-gradient-to-b from-[#D4A853] to-[#c49843]">
      {/* ヘッダー */}
      <div className="flex items-center p-4">
        <Link href={`${basePath}/home`} className="text-white">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="flex-1 text-center text-white font-bold text-lg">会員QRコード</h1>
        <div className="w-6" />
      </div>

      {/* QRコードカード */}
      <motion.div
        className="px-6 pt-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="text-center py-8 px-6">
          {/* QRコード */}
          <motion.div
            className="mx-auto mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-48 h-48 mx-auto bg-white border-4 border-gray-100 rounded-xl p-3 flex items-center justify-center">
              <QRCodeSVG
                value="https://classmethod.jp"
                size={160}
                level="M"
                marginSize={0}
              />
            </div>
          </motion.div>

          {/* 会員番号 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-gray-500 text-sm">会員番号</p>
            <p className="text-xl font-bold text-gray-800 tracking-wider">
              {mockUser.memberId}
            </p>
          </motion.div>
        </Card>
      </motion.div>

      {/* 説明文 */}
      <motion.div
        className="text-center px-6 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-white/90 text-sm">
          お会計時にスタッフに<br/>
          このQRコードを見せてください
        </p>
      </motion.div>
    </div>
  );
}
