// components/ui/FullScreenLoader.tsx
'use client';

import { useEffect } from 'react';

interface FullScreenLoaderProps {
  message?: string;
}

export default function FullScreenLoader({ message = 'Logging in...' }: FullScreenLoaderProps) {
  useEffect(() => {
    // Disable scrolling while loading screen is active
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <img
        src="/loading.gif"
        alt="Loading"
        className="mb-4 h-32 w-32"
      />
      <p className="text-white text-sm">{message}</p>
    </div>
  );
}
