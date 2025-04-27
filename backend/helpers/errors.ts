import { NextResponse } from 'next/server';

export class BadRequestError extends Error {
  statusCode = 400;
  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
  }
}

export function handleError(err: any) {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return NextResponse.json({ error: message }, { status });
}
