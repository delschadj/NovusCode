'use client';

import React, { useState, useEffect, KeyboardEvent } from 'react';
import { useTheme } from 'next-themes';
import { Send } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  text: string;
  type: 'user' | 'response';
}

interface QandABarFormValues {
  message: string;
}

const QandABar: React.FC = () => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const prompts = [
    "How can I help you?",
    "How to start this project?",
    "Did a monkey write this?",
    "Is this a code challenge?",
    "Am I being pranked?",
    "Is this a punishment?",
    "What did I do wrong in my life?",
  ];

  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPromptIndex((prevIndex) => (prevIndex + 1) % prompts.length);
    }, 5000); // Increased interval time from 3000ms to 5000ms

    return () => clearInterval(intervalId);
  }, []);

  const form = useForm<QandABarFormValues>({
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

  const onSubmit: SubmitHandler<QandABarFormValues> = async (data) => {
    if (data.message.trim() === '') return;

    setMessages([...messages, { text: data.message, type: 'user' }]);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:4000/chatInformation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: data.message }),
      });

      const responseData = await res.json();
      setMessages(prev => [...prev, { text: responseData.message, type: 'response' }]);
    } catch (error) {
      console.error('Error sending chat information:', error);
      setMessages(prev => [...prev, { text: 'Error fetching response', type: 'response' }]);
    } finally {
      setLoading(false);
      reset();
    }
  };

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
    <div className="flex flex-col h-full">
      <div id="messages-container" className="flex-grow overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full pt-16"> {/* Added pt-16 */}
            <h1 className="text-4xl font-bold mb-4">Hi Delschad</h1> {/* Adjusted margin-bottom */}
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

export default QandABar;