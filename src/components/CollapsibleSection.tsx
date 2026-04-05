'use client';

import { useState } from 'react';

interface CollapsibleSectionProps {
  title: string;
  count: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function CollapsibleSection({
  title,
  count,
  defaultOpen = false,
  children,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md border border-neutral-900 bg-[#0a0a0a] px-6 py-4 text-left font-mono tracking-widest text-neutral-300 transition-all hover:border-red-900/50 hover:bg-neutral-950"
      >
        <span>
          {title} <span className="text-red-700">[{count}]</span>
        </span>
        <span className="text-red-900 text-sm">{isOpen ? '▼' : '▶'}</span>
      </button>

      {isOpen && (
        <div className="mt-6">
          {children}
        </div>
      )}
    </div>
  );
}