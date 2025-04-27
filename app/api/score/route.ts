import { NextRequest, NextResponse } from 'next/server';
import { handleScoring } from '@/backend/controllers/scoreController';
import { handleError } from '@/backend/helpers/errors';
import { logger } from '@/backend/helpers/logger';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await handleScoring(body);
    return NextResponse.json(response);
  } catch (err) {
    logger.error('POST /api/score failed', err);
    return handleError(err);
  }
}
