// pagecontainer.tsx

import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PageContainer({
  children,
  scrollable = false
}: {
  children: React.ReactNode;
  scrollable?: boolean;
}) {
  return (
    <div className="h-screen"> {/* Ensure full viewport height */}
      {scrollable ? (
        <ScrollArea className="h-[calc(100vh-52px)]"> {/* Adjust for fixed header/footer */}
          <div className="h-full p-4 md:px-8">
            {children}
          </div>
        </ScrollArea>
      ) : (
        <div className="h-full p-4 md:px-8">
          {children}
        </div>
      )}
    </div>
  );
}
