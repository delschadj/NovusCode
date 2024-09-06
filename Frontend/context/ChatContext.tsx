"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { NavItem } from '@/types'; // Adjust this import path based on your project structure

interface ChatContextType {
  selectedChat: NavItem | null;
  setSelectedChat: (chat: NavItem | null) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState<NavItem | null>(null);

  return (
    <ChatContext.Provider value={{ selectedChat, setSelectedChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
