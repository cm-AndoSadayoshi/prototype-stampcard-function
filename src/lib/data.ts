import { User, Rank, Benefit, RankId } from "@/types";

export const mockUser: User = {
  name: "田中 美咲",
  memberId: "1234-5678",
  currentStamps: 68,
  currentRank: "gold",
  joinDate: "2024-06-15",
};

export const ranks: Rank[] = [
  {
    id: "bronze",
    name: "Bronze",
    requiredStamps: 0,
    color: "#CD7F32",
    benefits: ["会員限定情報配信"],
  },
  {
    id: "silver",
    name: "Silver",
    requiredStamps: 30,
    color: "#C0C0C0",
    benefits: ["5%OFFクーポン"],
  },
  {
    id: "gold",
    name: "Gold",
    requiredStamps: 70,
    color: "#D4A853",
    benefits: ["10%OFFクーポン", "誕生日特典"],
  },
  {
    id: "platinum",
    name: "Platinum",
    requiredStamps: 100,
    color: "#E5E4E2",
    benefits: ["15%OFFクーポン", "先行販売アクセス", "送料無料"],
  },
];

export const benefits: Benefit[] = [
  {
    id: 1,
    title: "10%OFFクーポン",
    description: "全商品10%OFF",
    validUntil: "2025-02-28",
    rank: "gold",
    used: false,
  },
  {
    id: 2,
    title: "誕生日特典",
    description: "バースデークーポン 20%OFF",
    validUntil: "2025-01-31",
    rank: "gold",
    used: false,
  },
  {
    id: 3,
    title: "送料無料クーポン",
    description: "1回分の送料が無料",
    validUntil: "2025-03-31",
    rank: "gold",
    used: true,
  },
];

export function getRankById(id: RankId): Rank {
  return ranks.find((r) => r.id === id) || ranks[0];
}

export function getNextRank(currentRankId: RankId): Rank | null {
  const currentIndex = ranks.findIndex((r) => r.id === currentRankId);
  if (currentIndex === -1 || currentIndex === ranks.length - 1) {
    return null;
  }
  return ranks[currentIndex + 1];
}

export function getStampsToNextRank(currentStamps: number, nextRank: Rank | null): number {
  if (!nextRank) return 0;
  return Math.max(0, nextRank.requiredStamps - currentStamps);
}

export function getProgressPercentage(currentStamps: number, currentRank: Rank, nextRank: Rank | null): number {
  if (!nextRank) return 100;
  const rangeStart = currentRank.requiredStamps;
  const rangeEnd = nextRank.requiredStamps;
  const range = rangeEnd - rangeStart;
  const progress = currentStamps - rangeStart;
  return Math.min(100, Math.max(0, (progress / range) * 100));
}
