export interface User {
  name: string;
  memberId: string;
  currentStamps: number;
  currentRank: RankId;
  joinDate: string;
}

export type RankId = "bronze" | "silver" | "gold" | "platinum";

export interface Rank {
  id: RankId;
  name: string;
  requiredStamps: number;
  color: string;
  benefits: string[];
}

export interface Benefit {
  id: number;
  title: string;
  description: string;
  validUntil: string;
  rank: RankId;
  used: boolean;
}
