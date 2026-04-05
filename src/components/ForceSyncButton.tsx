'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function ForceSyncButton({ xuid, titleId }: { xuid: string; titleId: string }) {
  const router = useRouter();
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sync/achievements/${xuid}/${titleId}`, {
        method: 'POST',
      });
      
      await new Promise((resolve) => setTimeout(resolve, 5000));
      
      router.refresh();
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <button 
      onClick={handleSync}
      disabled={isSyncing}
      className={`ml-4 rounded border px-3 py-1 text-xs font-mono transition-all ${
        isSyncing 
          ? 'border-red-900 bg-red-950/30 text-red-500 cursor-not-allowed animate-pulse' 
          : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-red-900 hover:text-red-500'
      }`}
    >
      {isSyncing ? '[ DECRYPTING... ]' : '[ FORCE SYNC ]'}
    </button>
  );
}