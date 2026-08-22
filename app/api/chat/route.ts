import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages || [];
    const portfolioData = body.portfolioData || {};

    const systemPrompt = `You are Arkar Chan Myae (the site owner), chatting directly with a visitor on your personal portfolio website. 
Speak in the first person ("I", "my", "me").
Your primary role is to answer questions about your experience, skills, education, and projects based strictly on the provided portfolio data.
Be concise, friendly, helpful, and professional. 
If a visitor asks a question that cannot be answered using the provided data, politely let them know that they can reach out via the contact section for more details.
Do not hallucinate or make up information.

Here is your portfolio data:
${JSON.stringify(portfolioData, null, 2)}`;

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const responseStream = await ai.models.generateContentStream({
      model: "gemini-flash-lite-latest",
      contents: messages,
      config: {
        systemInstruction: systemPrompt,
      },
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of responseStream) {
            if (chunk.text) {
              controller.enqueue(encoder.encode(chunk.text));
            }
          }
        } catch (e) {
          console.error("Streaming error:", e);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process chat request" }),
      { status: 500 },
    );
  }
}
