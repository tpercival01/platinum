'use client';

import { getAchievementCoin } from '@/lib/coin';

export function AchievementCard({ achievement }: { achievement: any }) {
  const coin = getAchievementCoin(achievement.gamerscore);
  
  const isUnlocked = achievement.isUnlocked;

  return (
    <div className={`flex items-start gap-4 rounded-xl border p-4 transition-all h-full ${
      isUnlocked 
        ? 'bg-[#0a0a0a] border-red-900/40 hover:border-red-700 shadow-[0_0_10px_rgba(139,0,0,0.1)]' 
        : 'bg-black border-neutral-900 opacity-60'
    }`}>
      
      <div className="shrink-0 h-16 w-16 overflow-hidden rounded-md bg-neutral-950 border border-neutral-800 flex items-center justify-center">
        {achievement.iconUrl ? (
          <img 
            src={achievement.iconUrl} 
            alt={achievement.name} 
            className={`h-full w-full object-cover ${!isUnlocked && 'grayscale opacity-50'}`} 
            onError={(e) => {
              // Hide the broken image icon safely in the browser!
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <span className="text-xs font-mono text-neutral-700">N/A</span>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className={`font-bold tracking-wide truncate ${isUnlocked ? 'text-neutral-200' : 'text-neutral-500'}`}>
          {achievement.name}
        </h3>
        <p className={`text-sm mt-1 line-clamp-2 ${isUnlocked ? 'text-neutral-400' : 'text-neutral-600'}`}>
          {achievement.description}
        </p>
      </div>
      
      <div className="shrink-0 text-right font-mono tracking-widest pl-2">
        <span className={`block text-xl font-bold ${isUnlocked ? 'text-neutral-300' : 'text-neutral-600'}`}>
          {achievement.gamerscore}G
        </span>
        <span className={`text-[10px] font-bold block mt-1 ${
          !isUnlocked ? 'text-neutral-700' :
          coin === 'Gold' ? 'text-yellow-600' : 
          coin === 'Silver' ? 'text-neutral-400' : 
          'text-amber-700'
        }`}>
          {coin.toUpperCase()}
        </span>
      </div>
    </div>
  );
}