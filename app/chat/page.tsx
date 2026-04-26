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

const KNOWLEDGE_BASE_UZ = {
  python: {
    topics: ['o\'zgaruvchilar', 'tiplar', 'loop', 'funksiya', 'list', 'dict', 'class'],
    responses: {
      o: 'Python-da o\'zgaruvchi = operatori bilan e\'lon qilinadi. Misol: x = 10',
      tiplar: 'Python-ning asosiy tiplari: int (butun sonlar), float (kasr sonlar), str (matnlar), bool (to\'g\'ri/noto\'g\'ri)',
      loop: 'for loop ketma-ketliklar orqali takrorlanish uchun. while loop shart to\'g\'ri bo\'lgunga qadar takrorlanadi.',
      funksiya: 'Funksiya def kalit so\'zi bilan e\'lon qilinadi. def my_func(): ...',
      list: 'List [] ichida e\'lon qilinadi. Misol: my_list = [1, 2, 3]. Elementlar indeks orqali qo\'shiladi.',
      dict: 'Dictionary (lug\'at) {} ichida key:value juftliklari bilan e\'lon qilinadi. Misol: person = {"name": "Ali", "age": 20}',
      class: 'Class-lar object-oriented dasturlashning asosidir. class MyClass: ... syntax bilan e\'lon qilinadi.',
    },
  },
  web: {
    topics: ['html', 'css', 'javascript', 'flex', 'grid', 'responsive'],
    responses: {
      html: 'HTML (<html>, <body>, <div> teg\'lari) web sahifaning tuzilishini e\'lon qiladi.',
      css: 'CSS stillarni boshqaradi. Misol: color, background-color, font-size va boshqa xususiyatlar.',
      javascript: 'JavaScript-da funksiya: function myFunc() {} yoki arrow function: () => {}',
      flex: 'Flexbox: display: flex; va justify-content, align-items xususiyatlari bilan ishlaydi.',
      grid: 'CSS Grid: display: grid; va grid-template-columns bilan tuziladi.',
      responsive: 'Responsive dizayn media queries @media (max-width: 768px) {} yordamida amalga oshiriladi.',
    },
  },
};

const KNOWLEDGE_BASE_EN = {
  python: {
    topics: ['variables', 'types', 'loops', 'functions', 'list', 'dict', 'class'],
    responses: {
      variables: 'In Python, use = to declare variables. Example: x = 10',
      types: 'Main Python types: int (integers), float (decimals), str (text), bool (true/false)',
      loops: 'for loop iterates through sequences. while loop continues while condition is true.',
      functions: 'Declare with def keyword. Example: def my_func(): ...',
      list: 'Lists use [] brackets. Example: my_list = [1, 2, 3]',
      dict: 'Dictionary uses {key: value}. Example: person = {"name": "Ali", "age": 20}',
      class: 'Classes use class keyword. Example: class MyClass: ...',
    },
  },
  web: {
    topics: ['html', 'css', 'javascript', 'flex', 'grid', 'responsive'],
    responses: {
      html: 'HTML tags (<html>, <body>, <div>) define page structure.',
      css: 'CSS controls styling: color, background-color, font-size, etc.',
      javascript: 'Function declaration: function myFunc() {} or arrow function: () => {}',
      flex: 'Flexbox: display: flex; with justify-content and align-items properties.',
      grid: 'CSS Grid: display: grid; with grid-template-columns.',
      responsive: 'Responsive design using @media (max-width: 768px) {} queries.',
    },
  },
};

function findBestResponse(userInput: string, language: string): string {
  const kb = language === 'uz' ? KNOWLEDGE_BASE_UZ : KNOWLEDGE_BASE_EN;
  const input = userInput.toLowerCase();

  // Check for Python questions
  for (const topic of kb.python.topics) {
    if (input.includes(topic)) {
      return kb.python.responses[topic as keyof typeof kb.python.responses] || 'Marhamat, bu haqida qo\'shimcha ma\'lumot bering.';
    }
  }

  // Check for Web questions
  for (const topic of kb.web.topics) {
    if (input.includes(topic)) {
      return kb.web.responses[topic as keyof typeof kb.web.responses] || 'Marhamat, bu haqida qo\'shimcha ma\'lumot bering.';
    }
  }

  // Default responses
  if (language === 'uz') {
    return 'Bu juda yaxshi savol! Python, Web Dasturlash, JavaScript yoki Data Structures haqida batafsil aytib bering, men sizga yordam beraman.';
  } else {
    return 'Great question! Tell me more about Python, Web Development, JavaScript, or Data Structures, and I\'ll help you!';
  }
}

export default function ChatPage() {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
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
    const greeting = language === 'uz'
      ? "Salom! Men Loopy, sizning AI kodlash yordamchingiz. Python, Web Dasturlash yoki JavaScript haqida hamma savollaringizni bering! 🤖"
      : "Hi! I'm Loopy, your AI coding assistant. Ask me anything about Python, Web Development, or JavaScript! 🤖";
    
    setMessages([
      {
        id: '1',
        text: greeting,
        isBot: true,
      },
    ]);
  }, [language]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate thinking delay
    setTimeout(() => {
      const response = findBestResponse(input, language);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isBot: true,
      };
      setMessages((prev) => [...prev, botMessage]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background pb-20 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-background to-background/80 backdrop-blur-sm border-b border-border p-4">
        <h1 className="text-2xl font-bold gradient-text">Loopy AI Yordamchi</h1>
        <p className="text-xs text-muted-foreground mt-1">
          {language === 'uz' ? 'Sizning kodlash hamkasbingiz' : 'Your coding companion'}
        </p>
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
        {loading && (
          <div className="flex justify-start">
            <GradientCard variant="purple" className="p-3">
              <p className="text-sm">⏳ Javob tayyorlanmoqda...</p>
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
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !loading) {
                handleSendMessage();
              }
            }}
            placeholder={language === 'uz' ? 'Savolni kiriting...' : 'Ask me anything...'}
            disabled={loading}
            className="flex-1 bg-input border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary disabled:opacity-50"
          />
          <GlowButton onClick={handleSendMessage} size="md" disabled={loading}>
            {language === 'uz' ? 'Yuborish' : 'Send'}
          </GlowButton>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {language === 'uz'
            ? 'Bepul reja: 5 xabar/kun • Premium: Cheksiz'
            : 'Free tier: 5 messages/day • Premium: Unlimited'}
        </p>
      </div>
    </div>
  );
}
