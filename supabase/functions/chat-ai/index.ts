import Anthropic from "npm:@anthropic-ai/sdk@0.32.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SYSTEM_PROMPT = `Sen Loopy - Loopify platformasining AI dasturlash yordamchisisisan. Foydalanuvchilarga Python, Web Dasturlash (HTML, CSS, JavaScript), va Sun'iy Intellekt haqida yordam berasan.

Qoidalar:
- Har doim qisqa va aniq javob ber (3-5 gap)
- Kod misollarini backtick ichida ko'rsat
- Agar savol dasturlash bilan bog'liq bo'lmasa, dasturlashga qaytarishga urin
- O'zbek tilida so'rashsa o'zbek tilida javob ber, ingliz tilida so'rashsa ingliz tilida javob ber
- Friendly va rag'batlantiruvchi bo'l
- Loopify o'quv platformasida Python, Web va AI kurslar borligini esga ol`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { messages, language } = await req.json();

    const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "API key not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const client = new Anthropic({ apiKey });

    const systemPrompt = language === "uz"
      ? SYSTEM_PROMPT
      : `You are Loopy - the AI coding assistant for Loopify learning platform. Help users with Python, Web Development (HTML, CSS, JavaScript), and AI topics.

Rules:
- Always give short and clear answers (3-5 sentences)
- Show code examples in backticks
- If question is not related to programming, try to redirect to programming topics
- Be friendly and encouraging
- Mention that Loopify has Python, Web, and AI courses`;

    const formattedMessages = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
    }));

    const response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 512,
      system: systemPrompt,
      messages: formattedMessages,
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";

    return new Response(
      JSON.stringify({ response: text }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Chat AI error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to get AI response", details: String(error) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
