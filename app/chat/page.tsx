'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/lib/language-context';
import { GradientCard } from '@/components/loopify/GradientCard';
import { GlowButton } from '@/components/loopify/GlowButton';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
}

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatPage() {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const greeting =
      language === 'uz'
        ? 'Salom! Men Loopy, sizning AI kodlash yordamchingizman. Python, Web Dasturlash, JavaScript va boshqa dasturlash mavzulari haqida har qanday savolingizni bering!'
        : "Hi! I'm Loopy, your AI coding assistant. Ask me anything about Python, Web Development, JavaScript, and more!";

    setMessages([{ id: '1', text: greeting, isBot: true }]);
    setConversationHistory([]);
  }, [language]);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      text: userText,
      isBot: false,
    };

    const newHistory: ConversationMessage[] = [
      ...conversationHistory,
      { role: 'user', content: userText },
    ];

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setConversationHistory(newHistory);

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      const response = await fetch(`${supabaseUrl}/functions/v1/chat-ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${supabaseKey}`,
          Apikey: supabaseKey || '',
        },
        body: JSON.stringify({ messages: newHistory, language }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Request failed');
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isBot: true,
      };

      setMessages((prev) => [...prev, botMessage]);
      setConversationHistory((prev) => [
        ...prev,
        { role: 'assistant', content: data.response },
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorText =
        language === 'uz'
          ? 'Kechirasiz, hozir javob bera olmayapman. Keyinroq urinib ko\'ring.'
          : 'Sorry, I could not respond right now. Please try again later.';
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), text: errorText, isBot: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-background to-background/80 backdrop-blur-sm border-b border-border p-4">
        <h1 className="text-2xl font-bold gradient-text">
          {language === 'uz' ? 'Loopy AI Yordamchi' : 'Loopy AI Assistant'}
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          {language === 'uz' ? 'Claude AI tomonidan quvvatlanadi' : 'Powered by Claude AI'}
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 max-w-2xl mx-auto w-full overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            {message.isBot && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-black font-bold text-sm mr-2 flex-shrink-0 mt-1">
                L
              </div>
            )}
            <GradientCard
              variant={message.isBot ? 'blue' : 'pink'}
              className="max-w-sm p-3"
            >
              <p className="text-sm whitespace-pre-wrap">{message.text}</p>
            </GradientCard>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-black font-bold text-sm mr-2 flex-shrink-0">
              L
            </div>
            <GradientCard variant="blue" className="p-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {language === 'uz' ? 'Yozmoqda' : 'Typing'}
                </span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </div>
            </GradientCard>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card p-4 max-w-2xl mx-auto w-full">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !loading) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder={language === 'uz' ? 'Savolingizni kiriting...' : 'Ask me anything...'}
            disabled={loading}
            className="flex-1 bg-input border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary disabled:opacity-50"
          />
          <GlowButton onClick={handleSendMessage} size="md" disabled={loading || !input.trim()}>
            {language === 'uz' ? 'Yuborish' : 'Send'}
          </GlowButton>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {language === 'uz'
            ? 'Har qanday dasturlash savolini bering'
            : 'Ask any programming question'}
        </p>
      </div>
    </div>
  );
}
