import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Send } from 'lucide-react';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  text: string;
  type: 'user' | 'response';
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom when messages update
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const handleSendMessage = async () => {
    if (message.trim() === '') return;

    // Add user message to the chat
    setMessages([...messages, { text: message, type: 'user' }]);
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:4000/chatInformation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setMessages([...messages, { text: message, type: 'user' }, { text: data.message, type: 'response' }]);
    } catch (error) {
      console.error('Error sending chat information:', error);
      setMessages([...messages, { text: message, type: 'user' }, { text: 'Error fetching response', type: 'response' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default behavior of Enter key (e.g., form submission)
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md h-full flex items-center justify-center p-4">
      <div className={`w-full max-w-md h-full flex flex-col rounded-2xl shadow-2xl ${
        theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-200'
      }`}>
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-semibold">Chatbot</h2>
          <button
            aria-label="Close Chat"
            className="text-2xl text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="flex-grow p-4 overflow-y-auto">
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
            {/* Ref to scroll to the bottom */}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="border-t p-4 flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown} // Add key down event handler
            placeholder="Type your message..."
            className={`flex-grow p-3 rounded-full focus:outline-none ${
              theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'
            }`}
          />
          <button
            aria-label="Send Message"
            className={`ml-2 p-3 rounded-full focus:outline-none ${
              theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
            }`}
            onClick={handleSendMessage}
            disabled={loading}
          >
            <Send size={20} color={theme === 'dark' ? '#000000' : '#ffffff'} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
