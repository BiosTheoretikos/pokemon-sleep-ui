export type MealStrengthInfo = {
  strengthBase: number,
  strengthAfterRarity: number,
  strengthFinal: number,
  bonusRate: number,
};

export type MealStrengthInfoFinal = MealStrengthInfo & {
  bonusRateWithFiller: number,
};
