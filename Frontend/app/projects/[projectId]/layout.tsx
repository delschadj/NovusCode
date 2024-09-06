'use client';

import React, { useState } from 'react';
import { useTheme } from 'next-themes'; // Assuming you're using next-themes for theme management

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme(); // Get the current theme (dark or light)

  return (
    <div className="relative min-h-screen">
      <main>{children}</main>
      {/* Fixed Icon */}
      <div className="fixed bottom-8 right-8">
      </div>
    </div>
  );
};

export default Layout;
