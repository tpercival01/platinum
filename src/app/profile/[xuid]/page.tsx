import { db } from '@/lib/db';
import { achievements, games } from '@/lib/schema';
import { eq, desc, and} from 'drizzle-orm';
import Link from 'next/link';
import { SyncLoader } from '@/components/SyncLoader';
import { GlobalSyncButton } from '@/components/GlobalSyncButton';

export const dynamic = 'force-dynamic';

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ xuid: string }>;
}) {
  const xuid = (await params).xuid;

  const userGames = await db
    .select()
    .from(games)
    .where(eq(games.userXuid, xuid))
    .orderBy(desc(games.lastTimePlayed));

  if (userGames.length === 0) {
    return (
      <main className="p-8 flex min-h-screen items-center justify-center">
        <SyncLoader xuid={xuid} message="Extracting Game Library..." />
      </main>
    );
  }

  const unlockedAch = await db
  .select({gamerscore: achievements.gamerscore})
  .from(achievements)
  .where(and(eq(achievements.userXuid, xuid), eq(achievements.isUnlocked, true)));

  let bronze = 0; let silver = 0; let gold = 0;
  unlockedAch.forEach(a => {
    if (a.gamerscore >= 80) gold++;
    else if (a.gamerscore >= 40) silver++;
    else bronze++;
  });

  const onyxCoins = userGames.filter(g => (g.currentGamerscore ?? 0) === (g.totalGamerscore ?? 0) && (g.totalGamerscore ?? 0) > 0).length;

return (
    <main className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-8">
      
      {/* HEADER & SYNC BUTTON */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-widest text-neutral-200">
            ONYX <span className="text-red-700">DASHBOARD</span>
          </h1>
        </div>
        <GlobalSyncButton xuid={xuid} />
      </div>

      {/* THE ONYX SHOWCASE */}
      <div className="mb-16 grid grid-cols-2 md:grid-cols-4 gap-4 rounded-2xl border border-neutral-900 bg-[#050505] p-6 shadow-2xl shadow-red-900/5">
        
        {/* Onyx Coin (The Platinum) */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-red-900/50 bg-black p-6 shadow-[0_0_20px_rgba(139,0,0,0.2)]">
          <div className="mb-2 h-12 w-12 rounded-full bg-gradient-to-br from-red-600 to-black border-2 border-red-500 shadow-[0_0_15px_#ff0000] animate-sith-pulse"></div>
          <span className="text-3xl font-bold text-neutral-200 font-mono">{onyxCoins}</span>
          <span className="text-xs font-bold tracking-widest text-red-500 mt-1">ONYX</span>
        </div>

        {/* Gold Coin */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-yellow-900/30 bg-[#0a0a0a] p-4">
          <div className="mb-2 h-10 w-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-800 border-2 border-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.3)]"></div>
          <span className="text-2xl font-bold text-neutral-300 font-mono">{gold}</span>
          <span className="text-xs font-bold tracking-widest text-yellow-600 mt-1">GOLD</span>
        </div>

        {/* Silver Coin */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-neutral-800 bg-[#0a0a0a] p-4">
          <div className="mb-2 h-10 w-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-600 border-2 border-gray-400"></div>
          <span className="text-2xl font-bold text-neutral-300 font-mono">{silver}</span>
          <span className="text-xs font-bold tracking-widest text-neutral-400 mt-1">SILVER</span>
        </div>

        {/* Bronze Coin */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-amber-900/30 bg-[#0a0a0a] p-4">
          <div className="mb-2 h-10 w-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-900 border-2 border-amber-700"></div>
          <span className="text-2xl font-bold text-neutral-300 font-mono">{bronze}</span>
          <span className="text-xs font-bold tracking-widest text-amber-700 mt-1">BRONZE</span>
        </div>
      </div>

      {/* GAME GRID */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {userGames.map((game) => (
          <Link 
            href={`/profile/${xuid}/game/${game.id}`} 
            key={game.id} 
            prefetch={false}
            className="block h-full"
          >
            <div className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-[#0a0a0a] border border-neutral-800 p-4 transition-all duration-300 hover:border-red-700 hover:shadow-[0_0_20px_rgba(139,0,0,0.3)] cursor-pointer">
              
              {/* Platinum check based on Gamerscore! */}
              {(game.currentGamerscore ?? 0) === (game.totalGamerscore ?? 0) && (game.totalGamerscore ?? 0) > 0 && (
                <div className="absolute top-6 right-6 z-10 rounded-full bg-black/90 p-2 border border-red-900 shadow-[0_0_15px_#8b0000]">
                  <div className="h-4 w-4 rounded-full bg-gradient-to-br from-red-500 to-black"></div>
                </div>
              )}
              
              <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-md border border-neutral-900 bg-neutral-950 pointer-events-none">
                {game.displayImage ? (
                  <img 
                    src={game.displayImage} 
                    alt={game.name} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs font-mono text-neutral-600">No Image</div>
                )}
              </div>
              <h2 className="font-bold text-neutral-300 line-clamp-2 mb-auto pointer-events-none">{game.name}</h2>
              
              <p className="text-sm text-neutral-500 mt-4 border-t border-neutral-900 pt-2 flex items-center justify-between pointer-events-none">
                <span>PROGRESS</span>
                <span className="font-mono">
                  <span className="text-red-700">{game.currentGamerscore ?? 0}</span> / {game.totalGamerscore ?? 0} G
                </span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}