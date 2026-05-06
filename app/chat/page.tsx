'use client'

import { useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { useLanguage } from '@/lib/language-context'
import { GradientCard } from '@/components/loopify/GradientCard'
import { GlowButton } from '@/components/loopify/GlowButton'

function getMessageText(message: { parts?: Array<{ type: string; text?: string }> }): string {
  if (!message.parts || !Array.isArray(message.parts)) return ''
  return message.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text' && typeof p.text === 'string')
    .map((p) => p.text)
    .join('')
}

export default function ChatPage() {
  const { language } = useLanguage()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, input, setInput, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
      prepareSendMessagesRequest: ({ id, messages }) => ({
        body: {
          id,
          messages,
          language,
        },
      }),
    }),
  })

  const isLoading = status === 'streaming' || status === 'submitted'

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
        parts: [{ type: 'text', text: greeting }],
      },
    ])
  }, [language, setMessages])

  const handleSendMessage = () => {
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput('')
  }

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
        {messages.map((message) => {
          const text = getMessageText(message)
          if (!text) return null

          return (
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
                <p className="text-sm whitespace-pre-wrap">{text}</p>
              </GradientCard>
            </div>
          )
        })}
        {isLoading && messages[messages.length - 1]?.role === 'user' && (
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
          {language === 'uz' ? 'Har qanday dasturlash savolini bering' : 'Ask any programming question'}
        </p>
      </div>
    </div>
  )
}
