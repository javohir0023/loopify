'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/lib/language-context'
import { GradientCard } from '@/components/loopify/GradientCard'
import { GlowButton } from '@/components/loopify/GlowButton'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export default function ChatPage() {
  const { language } = useLanguage()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const greeting =
      language === 'uz'
        ? 'Salom! Men Loopy, sizning AI kodlash yordamchingizman. Python, Web Dasturlash, JavaScript va boshqa dasturlash mavzulari haqida har qanday savolingizni bering!'
        : "Hi! I'm Loopy, your AI coding assistant. Ask me anything about Python, Web Development, JavaScript, and more!"

    setMessages([
      {
        id: 'greeting',
        role: 'assistant',
        content: greeting,
      },
    ])
  }, [language])

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          language,
        }),
      })

      if (!response.ok) {
        throw new Error('API error')
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantContent = ''

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
      }

      setMessages((prev) => [...prev, assistantMessage])

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n')

          for (const line of lines) {
            const trimmed = line.trim()
            if (trimmed.startsWith('data:')) {
              const data = trimmed.slice(5).trim()
              if (data === '[DONE]') continue
              try {
                const parsed = JSON.parse(data)
                if (parsed.type === 'text-delta' && parsed.delta) {
                  assistantContent += parsed.delta
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantMessage.id ? { ...m, content: assistantContent } : m
                    )
                  )
                }
              } catch {
                // Skip invalid JSON
              }
            }
          }
        }
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          language === 'uz'
            ? 'Kechirasiz, hozir javob bera olmayapman. Mentorlarimiz tez orada sizga yordam berishadi. Iltimos, keyinroq urinib ko\'ring yoki kurslarimizga qarang!'
            : 'Sorry, I cannot respond right now. Our mentors will help you soon. Please try again later or check out our courses!',
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-background to-background/80 backdrop-blur-sm border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-black font-bold">
            L
          </div>
          <div>
            <h1 className="text-xl font-bold gradient-text">
              {language === 'uz' ? 'Loopy AI Yordamchi' : 'Loopy AI Assistant'}
            </h1>
            <p className="text-xs text-muted-foreground">
              {language === 'uz' ? 'OpenAI GPT-4o tomonidan quvvatlanadi' : 'Powered by OpenAI GPT-4o'}
            </p>
          </div>
        </div>
      </div>

      {/* AI Menu Info */}
      <div className="px-4 py-2 bg-card/50 border-b border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>
            {language === 'uz'
              ? 'AI yordamchi faol - Python, Web, AI haqida savol bering'
              : 'AI assistant active - Ask about Python, Web, AI'}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 max-w-2xl mx-auto w-full overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-black font-bold text-sm mr-2 flex-shrink-0 mt-1">
                L
              </div>
            )}
            <GradientCard
              variant={message.role === 'assistant' ? 'blue' : 'pink'}
              className="max-w-sm p-3"
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </GradientCard>
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-black font-bold text-sm mr-2 flex-shrink-0">
              L
            </div>
            <GradientCard variant="blue" className="p-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {language === 'uz' ? 'Mentorlarimiz javob tayyorlamoqda...' : 'Our mentors are preparing an answer...'}
                </span>
                <span className="flex gap-1">
                  <span
                    className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  />
                  <span
                    className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  />
                  <span
                    className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  />
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
              if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            placeholder={language === 'uz' ? 'Savolingizni kiriting...' : 'Ask me anything...'}
            disabled={isLoading}
            className="flex-1 bg-input border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary disabled:opacity-50"
          />
          <GlowButton onClick={handleSendMessage} size="md" disabled={isLoading || !input.trim()}>
            {language === 'uz' ? 'Yuborish' : 'Send'}
          </GlowButton>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {language === 'uz'
            ? 'Mentorlarimiz har qanday dasturlash savoliga javob berishadi'
            : 'Our mentors will answer any programming question'}
        </p>
      </div>
    </div>
  )
}
