import { streamText } from 'ai'

const SYSTEM_PROMPT_UZ = `Sen Loopy - Loopify platformasining AI dasturlash yordamchisisisan. Foydalanuvchilarga Python, Web Dasturlash (HTML, CSS, JavaScript), va Sun'iy Intellekt haqida yordam berasan.

Qoidalar:
- Har doim qisqa va aniq javob ber (3-5 gap)
- Kod misollarini backtick ichida ko'rsat
- Agar savol dasturlash bilan bog'liq bo'lmasa, dasturlashga qaytarishga urin
- O'zbek tilida so'rashsa o'zbek tilida javob ber
- Friendly va rag'batlantiruvchi bo'l
- Loopify o'quv platformasida Python, Web va AI kurslar borligini esga ol
- Sen Loopify mentorlarining AI yordamchisisisan`

const SYSTEM_PROMPT_EN = `You are Loopy - the AI coding assistant for Loopify learning platform. Help users with Python, Web Development (HTML, CSS, JavaScript), and AI topics.

Rules:
- Always give short and clear answers (3-5 sentences)
- Show code examples in backticks
- If question is not related to programming, try to redirect to programming topics
- Be friendly and encouraging
- Mention that Loopify has Python, Web, and AI courses
- You are an AI assistant representing Loopify mentors`

export async function POST(req: Request) {
  try {
    const { messages, language } = await req.json()

    const systemPrompt = language === 'uz' ? SYSTEM_PROMPT_UZ : SYSTEM_PROMPT_EN

    const result = streamText({
      model: 'anthropic/claude-haiku-4.5',
      system: systemPrompt,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error('[v0] Chat API error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
