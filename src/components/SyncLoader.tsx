'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkGamesExist, checkAchievementsExist } from '@/app/actions';

export function SyncLoader({
  xuid,
  titleId,
  message,
}: {
  xuid: string;
  titleId?: string; // If provided, we poll achievements. If not, we poll games.
  message: string;
}) {
  const router = useRouter();

  useEffect(() => {
    // If we need to sync achievements, tell the Python API to start cooking
    if (titleId) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/sync/achievements/${xuid}/${titleId}`, {
        method: 'POST',
      }).catch(console.error);
    }

    // Start polling the Neon Database every 3 seconds
    const interval = setInterval(async () => {
      let dataArrived = false;
      
      if (titleId) {
        dataArrived = await checkAchievementsExist(xuid, titleId);
      } else {
        dataArrived = await checkGamesExist(xuid);
      }

      if (dataArrived) {
        clearInterval(interval);
        router.refresh(); // Tells Next.js to re-render the Server Component with the new data!
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [xuid, titleId, router]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-6">
      {/* Mystic glowing red orb */}
      <div className="h-16 w-16 animate-sith-pulse rounded-full bg-red-900 border border-red-500"></div>
      <p className="text-xl tracking-widest text-neutral-400 font-mono uppercase">
        {message}
      </p>
    </div>
  );
}