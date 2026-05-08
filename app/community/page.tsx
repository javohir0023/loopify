'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/lib/language-context'
import { GradientCard } from '@/components/loopify/GradientCard'
import { GlowButton } from '@/components/loopify/GlowButton'

interface CommunityMessage {
  id: string
  username: string
  avatar: string
  content: string
  timestamp: number
  isCurrentUser: boolean
}

const DEMO_USERS = [
  { username: 'Sardor_Dev', avatar: 'S' },
  { username: 'Madina_Coder', avatar: 'M' },
  { username: 'Jasur_Python', avatar: 'J' },
  { username: 'Nilufar_Web', avatar: 'N' },
  { username: 'Bekzod_AI', avatar: 'B' },
]

const DEMO_MESSAGES: Omit<CommunityMessage, 'isCurrentUser'>[] = [
  {
    id: '1',
    username: 'Sardor_Dev',
    avatar: 'S',
    content: "Hammaga salom! Bugun Python o'rganyapman, juda qiziqarli ekan!",
    timestamp: Date.now() - 3600000,
  },
  {
    id: '2',
    username: 'Madina_Coder',
    avatar: 'M',
    content: "Salom Sardor! Men ham Python boshlagan edim, hozir Web ga o'tdim. HTML/CSS juda oson ekan!",
    timestamp: Date.now() - 3000000,
  },
  {
    id: '3',
    username: 'Jasur_Python',
    avatar: 'J',
    content: 'Kimdir JavaScript bilan yordam bera oladimi? Loop bilan muammo bor',
    timestamp: Date.now() - 2400000,
  },
  {
    id: '4',
    username: 'Nilufar_Web',
    avatar: 'N',
    content: '@Jasur_Python qanday muammo? for loop mi yoki while loop?',
    timestamp: Date.now() - 1800000,
  },
  {
    id: '5',
    username: 'Bekzod_AI',
    avatar: 'B',
    content: "Yangi Kiber Xavfsizlik kursini ko'rdinglarmi? Juda foydali ekan!",
    timestamp: Date.now() - 1200000,
  },
]

function formatTime(timestamp: number): string {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
}

function getRandomUser() {
  return DEMO_USERS[Math.floor(Math.random() * DEMO_USERS.length)]
}

const AUTO_REPLIES = [
  "Ajoyib savol! Men ham shuni o'ylab yurgan edim",
  "Rahmat! Bu menga juda yordam berdi",
  "Loopify orqali o'rganish juda oson ekan!",
  "Kim Quiz o'ynashni xohlaydi?",
  "Bugun 50 XP yutdim!",
  "Dasturlash juda qiziqarli!",
  "Yangi darsni tugatdim, navbatdagi bosqichga o'tdim!",
]

export default function CommunityPage() {
  const { language } = useLanguage()
  const [messages, setMessages] = useState<CommunityMessage[]>([])
  const [input, setInput] = useState('')
  const [currentUser] = useState({ username: 'Siz', avatar: 'U' })
  const [onlineCount] = useState(Math.floor(Math.random() * 50) + 20)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load messages from localStorage
    const saved = localStorage.getItem('loopify_community_messages')
    if (saved) {
      setMessages(JSON.parse(saved))
    } else {
      // Initialize with demo messages
      const initialMessages = DEMO_MESSAGES.map((m) => ({ ...m, isCurrentUser: false }))
      setMessages(initialMessages)
      localStorage.setItem('loopify_community_messages', JSON.stringify(initialMessages))
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Simulate other users typing
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const randomUser = getRandomUser()
        const randomReply = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)]
        const newMessage: CommunityMessage = {
          id: Date.now().toString(),
          username: randomUser.username,
          avatar: randomUser.avatar,
          content: randomReply,
          timestamp: Date.now(),
          isCurrentUser: false,
        }
        setMessages((prev) => {
          const updated = [...prev, newMessage]
          localStorage.setItem('loopify_community_messages', JSON.stringify(updated))
          return updated
        })
      }
    }, 15000) // Every 15 seconds

    return () => clearInterval(interval)
  }, [])

  const handleSendMessage = () => {
    if (!input.trim()) return

    const newMessage: CommunityMessage = {
      id: Date.now().toString(),
      username: currentUser.username,
      avatar: currentUser.avatar,
      content: input.trim(),
      timestamp: Date.now(),
      isCurrentUser: true,
    }

    setMessages((prev) => {
      const updated = [...prev, newMessage]
      localStorage.setItem('loopify_community_messages', JSON.stringify(updated))
      return updated
    })
    setInput('')

    // Simulate reply after 2-5 seconds
    setTimeout(() => {
      const randomUser = getRandomUser()
      const replies = [
        `@${currentUser.username} ajoyib fikr!`,
        `Rahmat @${currentUser.username}!`,
        "Qiziqarli, davom et!",
        "Men ham shunaqa o'ylagan edim",
        "Zo'r! Omad!",
      ]
      const reply: CommunityMessage = {
        id: (Date.now() + 1).toString(),
        username: randomUser.username,
        avatar: randomUser.avatar,
        content: replies[Math.floor(Math.random() * replies.length)],
        timestamp: Date.now(),
        isCurrentUser: false,
      }
      setMessages((prev) => {
        const updated = [...prev, reply]
        localStorage.setItem('loopify_community_messages', JSON.stringify(updated))
        return updated
      })
    }, Math.random() * 3000 + 2000)
  }

  const clearChat = () => {
    const initialMessages = DEMO_MESSAGES.map((m) => ({ ...m, isCurrentUser: false }))
    setMessages(initialMessages)
    localStorage.setItem('loopify_community_messages', JSON.stringify(initialMessages))
  }

  return (
    <div className="min-h-screen bg-background pb-20 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-background to-background/80 backdrop-blur-sm border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
              C
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">
                {language === 'uz' ? 'Loopify Community' : 'Loopify Community'}
              </h1>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                {onlineCount} {language === 'uz' ? 'ta faol foydalanuvchi' : 'users online'}
              </p>
            </div>
          </div>
          <button
            onClick={clearChat}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            {language === 'uz' ? 'Tozalash' : 'Clear'}
          </button>
        </div>
      </div>

      {/* Group Info */}
      <div className="px-4 py-2 bg-card/50 border-b border-border">
        <p className="text-xs text-muted-foreground text-center">
          {language === 'uz'
            ? "Bu guruhda Loopify o'quvchilari bir-biriga yordam berishadi. Savollar bering, tajriba ulashing!"
            : 'Loopify learners help each other here. Ask questions, share experiences!'}
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-3 max-w-2xl mx-auto w-full overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            {!message.isCurrentUser && (
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mr-2 flex-shrink-0 mt-1"
                style={{
                  background: `linear-gradient(135deg, hsl(${message.username.charCodeAt(0) * 5}, 70%, 50%), hsl(${message.username.charCodeAt(0) * 5 + 30}, 70%, 60%))`,
                }}
              >
                {message.avatar}
              </div>
            )}
            <div className={`max-w-xs ${message.isCurrentUser ? 'items-end' : 'items-start'}`}>
              {!message.isCurrentUser && (
                <p className="text-xs font-medium text-primary mb-1">{message.username}</p>
              )}
              <GradientCard
                variant={message.isCurrentUser ? 'pink' : 'default'}
                className="p-3"
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {formatTime(message.timestamp)}
                </p>
              </GradientCard>
            </div>
          </div>
        ))}
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
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            placeholder={language === 'uz' ? 'Xabar yozing...' : 'Type a message...'}
            className="flex-1 bg-input border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
          />
          <GlowButton onClick={handleSendMessage} size="md" disabled={!input.trim()}>
            {language === 'uz' ? 'Yuborish' : 'Send'}
          </GlowButton>
        </div>
      </div>
    </div>
  )
}
