import { NextRequest, NextResponse } from 'next/server';
import { handleChatTurn } from '@/backend/controllers/chatController';
import { handleError } from '@/backend/helpers/errors';
import { logger } from '@/backend/helpers/logger';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await handleChatTurn(body);
    return NextResponse.json(response);
  } catch (err) {
    logger.error('POST /api/questions failed', err);
    return handleError(err);
  }
}
