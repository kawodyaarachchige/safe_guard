import React, { useState } from 'react';
import { Send } from 'lucide-react';

const AIChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your safety assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      // Add user message
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: input,
        isBot: false
      }]);

      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          text: "I understand your concern. Here's some safety advice: Always stay aware of your surroundings, keep your emergency contacts updated, and don't hesitate to use the SOS button if you feel unsafe.",
          isBot: true
        }]);
      }, 1000);

      setInput('');
    }
  };

  return (
      <div className="container mx-auto py-8 px-4 max-w-3xl">
        <div className="bg-white rounded-lg shadow-md h-[600px] flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Safety Assistant</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                          message.isBot
                              ? 'bg-gray-100'
                              : 'bg-purple-600 text-white'
                      }`}
                  >
                    {message.text}
                  </div>
                </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-4 border-t flex gap-2">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded"
            />
            <button
                type="submit"
                className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
  );
};

export default AIChat;