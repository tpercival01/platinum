import { submitGamertag } from './actions';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-[#0a0a0a] p-8 shadow-2xl shadow-red-900/10">
        <h1 className="mb-8 text-center text-3xl font-bold tracking-widest text-neutral-200">
          XBOX <span className="text-red-700">TRACKER</span>
        </h1>
        
        <form action={submitGamertag} className="flex flex-col space-y-4">
          <input
            type="text"
            name="gamertag"
            placeholder="Enter Gamertag..."
            className="rounded-lg border border-neutral-700 bg-neutral-900 p-4 text-white placeholder-neutral-500 focus:border-red-700 focus:outline-none focus:ring-1 focus:ring-red-700 transition-all font-mono"
            required
          />
          <button 
            type="submit"
            className="rounded-lg bg-neutral-900 border border-red-900/50 py-4 font-bold tracking-widest text-red-500 transition-all hover:bg-red-950 hover:text-red-400 hover:shadow-[0_0_15px_rgba(139,0,0,0.4)]"
          >
            INITIALIZE
          </button>
        </form>
      </div>
    </main>
  );
}