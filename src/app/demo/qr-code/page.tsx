"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Sun } from "lucide-react";
import { Card } from "@/components/ui/card";
import { mockUser } from "@/lib/data";

export default function QRCodePage() {
  return (
    <div className="min-h-full bg-gradient-to-b from-[#D4A853] to-[#c49843]">
      {/* ヘッダー */}
      <div className="flex items-center p-4">
        <Link href="/demo/home" className="text-white">
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
          {/* 輝度アップ表示 */}
          <motion.div
            className="flex items-center justify-center gap-2 text-[#D4A853] mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Sun className="w-5 h-5" />
            <span className="text-sm font-medium">画面が明るくなっています</span>
          </motion.div>

          {/* QRコード */}
          <motion.div
            className="mx-auto mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-48 h-48 mx-auto bg-white border-4 border-gray-100 rounded-xl p-3">
              {/* QRコードのダミー表示 */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* QRコードパターン */}
                <rect x="0" y="0" width="30" height="30" fill="#000"/>
                <rect x="5" y="5" width="20" height="20" fill="#fff"/>
                <rect x="10" y="10" width="10" height="10" fill="#000"/>

                <rect x="70" y="0" width="30" height="30" fill="#000"/>
                <rect x="75" y="5" width="20" height="20" fill="#fff"/>
                <rect x="80" y="10" width="10" height="10" fill="#000"/>

                <rect x="0" y="70" width="30" height="30" fill="#000"/>
                <rect x="5" y="75" width="20" height="20" fill="#fff"/>
                <rect x="10" y="80" width="10" height="10" fill="#000"/>

                {/* データパターン */}
                <rect x="35" y="5" width="5" height="5" fill="#000"/>
                <rect x="45" y="5" width="5" height="5" fill="#000"/>
                <rect x="55" y="5" width="5" height="5" fill="#000"/>
                <rect x="35" y="15" width="5" height="5" fill="#000"/>
                <rect x="50" y="15" width="5" height="5" fill="#000"/>
                <rect x="60" y="15" width="5" height="5" fill="#000"/>
                <rect x="40" y="25" width="5" height="5" fill="#000"/>
                <rect x="55" y="25" width="5" height="5" fill="#000"/>

                <rect x="5" y="35" width="5" height="5" fill="#000"/>
                <rect x="15" y="35" width="5" height="5" fill="#000"/>
                <rect x="25" y="35" width="5" height="5" fill="#000"/>
                <rect x="5" y="45" width="5" height="5" fill="#000"/>
                <rect x="20" y="45" width="5" height="5" fill="#000"/>
                <rect x="10" y="55" width="5" height="5" fill="#000"/>
                <rect x="25" y="55" width="5" height="5" fill="#000"/>

                <rect x="35" y="35" width="30" height="30" fill="#000"/>
                <rect x="40" y="40" width="20" height="20" fill="#fff"/>
                <rect x="45" y="45" width="10" height="10" fill="#000"/>

                <rect x="70" y="35" width="5" height="5" fill="#000"/>
                <rect x="80" y="35" width="5" height="5" fill="#000"/>
                <rect x="90" y="35" width="5" height="5" fill="#000"/>
                <rect x="75" y="45" width="5" height="5" fill="#000"/>
                <rect x="85" y="45" width="5" height="5" fill="#000"/>
                <rect x="70" y="55" width="5" height="5" fill="#000"/>
                <rect x="80" y="55" width="5" height="5" fill="#000"/>
                <rect x="95" y="55" width="5" height="5" fill="#000"/>

                <rect x="35" y="70" width="5" height="5" fill="#000"/>
                <rect x="45" y="70" width="5" height="5" fill="#000"/>
                <rect x="55" y="70" width="5" height="5" fill="#000"/>
                <rect x="40" y="80" width="5" height="5" fill="#000"/>
                <rect x="50" y="80" width="5" height="5" fill="#000"/>
                <rect x="60" y="80" width="5" height="5" fill="#000"/>
                <rect x="35" y="90" width="5" height="5" fill="#000"/>
                <rect x="50" y="90" width="5" height="5" fill="#000"/>
                <rect x="65" y="90" width="5" height="5" fill="#000"/>

                <rect x="75" y="70" width="5" height="5" fill="#000"/>
                <rect x="85" y="70" width="5" height="5" fill="#000"/>
                <rect x="70" y="80" width="5" height="5" fill="#000"/>
                <rect x="80" y="80" width="5" height="5" fill="#000"/>
                <rect x="90" y="80" width="5" height="5" fill="#000"/>
                <rect x="75" y="90" width="5" height="5" fill="#000"/>
                <rect x="95" y="90" width="5" height="5" fill="#000"/>
              </svg>
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
