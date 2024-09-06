// InputBar.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Send } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface Message {
  text: string;
  type: 'user' | 'response';
}

interface InputBarFormValues {
  message: string;
}

const InputBar: React.FC = () => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const form = useForm<InputBarFormValues>({
    defaultValues: {
      message: ''
    },
    mode: 'onChange'
  });

  const { register, handleSubmit, reset } = form;

  // Scroll to the bottom of the messages container when messages are updated
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const onSubmit: SubmitHandler<InputBarFormValues> = async (data) => {
    console.log('started');
  };

  return (
    <div>
      <div>
        <div className="flex flex-col gap-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`rounded-lg p-3 ${
                msg.type === 'user'
                  ? 'self-end bg-blue-500 text-white'
                  : 'self-start bg-gray-200 text-black'
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && <p className="text-gray-500">Loading...</p>}
          {/* <div ref={messagesEndRef} /> */}
        </div>
      </div>
      <div className="sticky bottom-0 left-0 right-0 border-t bg-background">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-4">
            <label className="sr-only">Message</label>
            <div className="relative flex w-full items-center">
              <textarea
                {...register('message')}
                className={`h-12 w-full resize-none overflow-auto rounded-md border px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${
                  theme === 'dark'
                    ? 'border-gray-700 bg-gray-800 text-white'
                    : 'border-gray-200 bg-white text-black'
                }`}
                placeholder="Type your message..."
                disabled={loading}
                rows={1}
              />
              <button
                type="submit"
                disabled={loading}
                className={`group absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 transition-colors duration-300 hover:text-blue-500 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputBar;
