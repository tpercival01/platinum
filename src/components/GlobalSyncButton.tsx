'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function GlobalSyncButton({ xuid }: { xuid: string }) {
  const router = useRouter();
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sync/refresh/${xuid}`, {
        method: 'POST',
      });
      // Give Celery 6 seconds to fetch the games and queue achievement updates
      await new Promise((resolve) => setTimeout(resolve, 6000));
      router.refresh();
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <button 
      onClick={handleSync}
      disabled={isSyncing}
      className={`rounded-md border px-6 py-2 font-mono tracking-widest transition-all ${
        isSyncing 
          ? 'border-red-900 bg-red-950/30 text-red-500 cursor-not-allowed animate-pulse' 
          : 'border-neutral-800 bg-[#0a0a0a] text-neutral-400 hover:border-red-900 hover:text-red-500 hover:shadow-[0_0_15px_rgba(139,0,0,0.4)]'
      }`}
    >
      {isSyncing ? '[ SYNCHRONIZING NETWORK... ]' : '[ SYNC LIVE DATA ]'}
    </button>
  );
}