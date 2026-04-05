import { db } from '@/lib/db';
import { games } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { SyncLoader } from '@/components/SyncLoader';

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
    .where(eq(games.userXuid, xuid));

  if (userGames.length === 0) {
    return (
      <main className="p-8">
        <SyncLoader xuid={xuid} message="Extracting Game Library..." />
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-8">
      <h1 className="mb-12 text-4xl font-bold tracking-widest text-neutral-200 border-b border-red-900/50 pb-4">
        GAME DATABASE
      </h1>
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
              {game.currentGamerscore === game.totalGamerscore && game.totalGamerscore > 0 && (
                <div className="absolute top-6 right-6 z-10 rounded bg-black/80 px-2 py-1 text-xs tracking-widest text-red-500 border border-red-900 shadow-[0_0_10px_#8b0000]">
                  100%
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
              
              {/* GAMERSCORE UI INSTEAD OF ACHIEVEMENTS */}
              <p className="text-sm text-neutral-500 mt-4 border-t border-neutral-900 pt-2 flex items-center justify-between pointer-events-none">
                <span>PROGRESS</span>
                <span className="font-mono">
                  <span className="text-red-700">{game.currentGamerscore}</span> / {game.totalGamerscore} G
                </span>
              </p>

            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}