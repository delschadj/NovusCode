'use client';

import React, { useState, useEffect, KeyboardEvent } from 'react';
import { useTheme } from 'next-themes';
import { Send } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';

import { useProjectData } from '@/context/ProjectDataContext';
import { useUserData } from '@/context/UserDataContext';
import { useChat } from '@/context/ChatContext';

interface Message {
  text: string;
  type: 'user' | 'response';
}

interface ChatBarFormValues {
  message: string;
}

const ChatContent: React.FC<{ onMessageSent: () => void }> = ({ onMessageSent }) => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const { user } = useUserData();
  const { projectData } = useProjectData();
  const { selectedChat, setSelectedChat } = useChat();

  if (selectedChat) {
    console.log (selectedChat.messages)
  }
  

  const prompts = [
    "How can I help you?",
    "How to start the project?",
    "How to create a Turing machine?",
    "Why did the programmer quit his job?",
    "How many programmers does it take to change a light bulb?",
    "What's a pirate's favorite programming language?",
  ];

  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPromptIndex((prevIndex) => (prevIndex + 1) % prompts.length);
    }, 5000); // Interval time set to 5000ms (5 seconds)

    return () => clearInterval(intervalId);
  }, []);

  const form = useForm<ChatBarFormValues>({
    defaultValues: {
      message: ''
    },
    mode: 'onChange'
  });

  const { register, handleSubmit, reset, setValue } = form;

  useEffect(() => {
    const messagesContainer = document.getElementById('messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (selectedChat) {
      const chatMessages = selectedChat.messages.map((msg) => ({
        text: msg.content,
        type: msg.role === 'user' ? 'user' : 'response'
      }));
      setMessages(chatMessages);
    }
  }, [selectedChat]);

  const onSubmit: SubmitHandler<ChatBarFormValues> = async (data) => {
    if (data.message.trim() === '') return;
    
    setLoading(true);
    onMessageSent();
    
    if (selectedChat === null) {
      try {
        // First API call to save the chat
        const saveChatResponse = await fetch('http://localhost:4000/saveChat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uid: user.uid,
            projectID: projectData.id,
            title: data.message,
            messages: [
              {
                "id": "msg1",
                "content": data.message,
                "role": "user",
                "timestamp": new Date().toISOString()
              }
            ],
          }),
        });
        
        const saveChatData = await saveChatResponse.json();
        console.log('Save chat response:', saveChatData);
        
        // Second API call to test or fetch response
        const testResponse = await fetch('http://localhost:4000/test', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.uid,
            projectId: projectData.id,
            message: data.message,
          }),
        });
        
        const responseText = await testResponse.text();
        console.log('Test API response text:', responseText);
        
        // Update chat with the response
        if (saveChatData && saveChatData.chatId) {
          const updateChatResponse = await fetch('http://localhost:4000/updateChat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chatId: saveChatData.chatId,
              newMessage: {
                content: responseText,
                role: 'response',
                timestamp: new Date().toISOString()
              }
            }),
          });
          
          const updateChatData = await updateChatResponse.json();
          console.log('Update chat response:', updateChatData);
        } else {
          console.error('saveChatData does not have a valid chatId');
        }
        
        // Update messages state only once, with both user message and response
        setMessages(prevMessages => [
          ...prevMessages,
          { text: data.message, type: 'user' },
          { text: responseText, type: 'response' }
        ]);
        
        setSelectedChat(saveChatData);
        
      } catch (error) {
        console.error('Error processing chat information:', error);
        setMessages(prevMessages => [
          ...prevMessages,
          { text: data.message, type: 'user' },
          { text: 'Error processing response', type: 'response' }
        ]);
      } finally {
        setLoading(false);
        reset();
      }
    } else {
      console.log("selectedChat is not null");
      // Optionally, you can add more logic here if needed
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const handlePromptClick = (prompt: string) => {
    setValue('message', prompt);
    handleSubmit(onSubmit)();
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div id="messages-container" className="flex-grow overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl font-bold mb-4">Hi Delschad</h1>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentPromptIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-xl text-gray-600 cursor-pointer hover:text-blue-500 transition-colors"
                onClick={() => handlePromptClick(prompts[currentPromptIndex])}
              >
                {prompts[currentPromptIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  msg.type === 'user'
                    ? 'bg-blue-500 text-white self-end'
                    : 'bg-gray-200 text-black self-start'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && <p className="text-gray-500">Loading...</p>}
          </div>
        )}
      </div>
      <div className="flex-shrink-0 border-t bg-background p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative flex w-full mb-5">
            <textarea
              {...register("message")}
              className={`h-12 w-full rounded-md border px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none overflow-auto ${
                theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-200'
              }`}
              placeholder="Type your message..."
              disabled={loading}
              rows={1}
              onKeyDown={handleKeyDown}
            />
            <button
              type="submit"
              disabled={loading}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center p-2 rounded-md hover:bg-blue-500 hover:text-white transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">This chatbot is connected to the full codebase and documents. Use with caution.</p>
        </form>
      </div>
    </div>
  );
};

export default ChatContent;
