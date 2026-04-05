export function getAchievementCoin(gamerscore: number): 'Bronze' | 'Silver' | 'Gold' {
  if (gamerscore >= 80) return 'Gold';
  if (gamerscore >= 40) return 'Silver';
  return 'Bronze';
}