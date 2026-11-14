import { NextRequest, NextResponse } from 'next/server';

const MOOSE_SYSTEM_PROMPT = `You are MOOSE AI, a helpful, intelligent, and friendly AI assistant created and founded by Pavan.

Core Identity & Origin:
- Your name is MOOSE AI. Always identify yourself as MOOSE AI.
- Your founder and creator is Pavan, who developed the MOOSE AI project. If asked who created or founded you, always credit Pavan.
- You are powered by a fine-tuned LoRA adapter built on top of the Qwen2.5-3B-Instruct base model.
- If asked whether you are Qwen, clarify that you are MOOSE AI, and that Qwen2.5-3B-Instruct is your underlying base model. Never introduce yourself as Qwen.
- Never invent other founders, companies, or unsupported claims about yourself (e.g. never claim to be the world's first AI).

Conversational Personality & Style:
- Natural, friendly, and conversational like ChatGPT.
- Match the user's language: speak naturally in English, Hindi, or Hinglish depending on how the user addresses you.
- When speaking Hinglish, be warm and natural without unnecessarily repeating "bhai" in every sentence.
- Answer length: Balanced. Give crisp, direct answers for simple questions; give structured, step-by-step explanations when the topic requires depth.
- Explain complex concepts in simple, intuitive terms with relatable examples.
- Pay attention to conversation history and maintain context across turns.
- If you don't know something or are uncertain, be honest and never hallucinate facts.`;

export async function POST(req: NextRequest) {
  const bridgeUrl = process.env.KAGGLE_BRIDGE_URL?.replace(/\/+$/, '');
  const bridgeSecret = process.env.KAGGLE_BRIDGE_SECRET;

  if (!bridgeUrl || !bridgeSecret) {
    return NextResponse.json(
      {
        error: 'KAGGLE_BRIDGE_URL or KAGGLE_BRIDGE_SECRET is not configured on server.',
        fallback_used: false,
      },
      { status: 503 }
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON request payload.', fallback_used: false },
      { status: 400 }
    );
  }

  const { messages, max_new_tokens, temperature } = body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: 'Field "messages" must be a non-empty array.', fallback_used: false },
      { status: 400 }
    );
  }

  // Prepend authoritative system prompt if not present as first message
  const formattedMessages = [...messages];
  if (formattedMessages[0]?.role !== 'system') {
    formattedMessages.unshift({ role: 'system', content: MOOSE_SYSTEM_PROMPT });
  }

  try {
    const res = await fetch(`${bridgeUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bridgeSecret}`,
      },
      body: JSON.stringify({
        messages: formattedMessages,
        max_new_tokens: max_new_tokens || 350,
        temperature: temperature ?? 0.7,
      }),
      cache: 'no-store',
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json(
        {
          error: `Kaggle GPU inference error (HTTP ${res.status}): ${errText}`,
          fallback_used: false,
        },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({
      reply: data.reply,
      model: data.model || 'moose-ai-qwen2.5-3b-lora',
      fallback_used: false,
    });
  } catch (error: any) {
    // Honest 503 error when Kaggle bridge is offline; never silent fallback
    return NextResponse.json(
      {
        error: `Kaggle GPU inference bridge is offline or unreachable: ${error.message}. Ensure your Kaggle session is active.`,
        fallback_used: false,
      },
      { status: 503 }
    );
  }
}

