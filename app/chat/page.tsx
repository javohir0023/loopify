'use client';

import { useState } from 'react';
import { GradientCard } from '@/components/loopify/GradientCard';
import { GlowButton } from '@/components/loopify/GlowButton';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I&apos;m Loopy, your AI coding assistant. Ask me anything about Python, Web Development, or AI! 🤖',
      isBot: true,
    },
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "That's a great question! I'm here to help you learn. Let me explain that concept for you...",
        isBot: true,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);

    setInput('');
  };

  return (
    <div className="min-h-screen bg-background pb-20 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-background to-background/80 backdrop-blur-sm border-b border-border p-4">
        <h1 className="text-2xl font-bold gradient-text">Loopy AI Assistant</h1>
        <p className="text-xs text-muted-foreground mt-1">Your coding companion</p>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 max-w-2xl mx-auto w-full overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <GradientCard
              variant={message.isBot ? 'purple' : 'pink'}
              className={`max-w-xs p-3 ${message.isBot ? '' : 'bg-primary text-black'}`}
            >
              <p className="text-sm">{message.text}</p>
            </GradientCard>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card p-4 max-w-2xl mx-auto w-full">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            placeholder="Ask me anything..."
            className="flex-1 bg-input border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
          />
          <GlowButton onClick={handleSendMessage} size="md">
            Send
          </GlowButton>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Free tier: 5 messages/day • Premium: Unlimited
        </p>
      </div>
    </div>
  );
}
