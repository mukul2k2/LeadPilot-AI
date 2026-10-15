import { NextRequest, NextResponse } from 'next/server';
import { analyzeLeadWithAI, testLLMConnection } from '@/lib/gemini';
import { Lead, LLMConfig } from '@/types/lead';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lead, apiKey, config, action } = body as {
      lead?: Partial<Lead>;
      apiKey?: string;
      config?: Partial<LLMConfig>;
      action?: 'analyze' | 'test';
    };

    const effectiveConfig: Partial<LLMConfig> = {
      ...(config || {}),
      apiKey: config?.apiKey || apiKey
    };

    // Test connectivity action
    if (action === 'test') {
      const testResult = await testLLMConnection(effectiveConfig);
      return NextResponse.json(testResult);
    }

    if (!lead) {
      return NextResponse.json({ error: 'Lead data is required for analysis' }, { status: 400 });
    }

    const result = await analyzeLeadWithAI(lead, effectiveConfig);
    return NextResponse.json(result);
  } catch (error) {
    console.error('API /api/agent error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
}
