import { NextResponse } from 'next/server';

export async function GET() {
  const bridgeUrl = process.env.KAGGLE_BRIDGE_URL?.replace(/\/+$/, '');
  const bridgeSecret = process.env.KAGGLE_BRIDGE_SECRET;

  if (!bridgeUrl || !bridgeSecret) {
    return NextResponse.json(
      {
        status: 'misconfigured',
        error: 'KAGGLE_BRIDGE_URL or KAGGLE_BRIDGE_SECRET is not configured on server.',
        fallback_used: false,
      },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(`${bridgeUrl}/api/health`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${bridgeSecret}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json(
        {
          status: 'error',
          error: `Kaggle GPU bridge returned status ${res.status}: ${errText}`,
          fallback_used: false,
        },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'offline',
        error: `Failed to connect to Kaggle GPU inference bridge: ${error.message}. Ensure the Kaggle notebook is active.`,
        fallback_used: false,
      },
      { status: 503 }
    );
  }
}
