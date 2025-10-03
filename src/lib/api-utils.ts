import { NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * Standard API error responses
 */
export const ApiErrors = {
  ValidationFailed: (details: Array<{ field: string; message: string }>) =>
    NextResponse.json(
      { error: 'Validation failed', details },
      { status: 400 }
    ),

  RateLimited: () =>
    NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    ),

  SpamDetected: () =>
    NextResponse.json(
      { error: 'Message flagged as spam.' },
      { status: 400 }
    ),

  InternalError: () =>
    NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    ),

  BadRequest: (message: string) =>
    NextResponse.json(
      { error: message },
      { status: 400 }
    ),
} as const;

/**
 * Standard API success responses
 */
export const ApiSuccess = {
  FormSubmitted: (id: string) =>
    NextResponse.json(
      { message: 'Form submitted successfully', id },
      { status: 200 }
    ),

  HealthCheck: (message: string) =>
    NextResponse.json(
      { message },
      { status: 200 }
    ),
} as const;

/**
 * Validate request body against Zod schema
 */
export function validateRequestBody<T>(
  body: unknown,
  schema: z.ZodSchema<T>
): { success: true; data: T } | { success: false; error: NextResponse } {
  try {
    const data = schema.parse(body);
    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const details = error.issues.map((err: z.ZodIssue) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return { success: false, error: ApiErrors.ValidationFailed(details) };
    }
    return { success: false, error: ApiErrors.InternalError() };
  }
}

/**
 * Safe JSON parsing
 */
export async function safeJsonParse(request: Request): Promise<{
  success: true;
  data: unknown;
} | {
  success: false;
  error: NextResponse;
}> {
  try {
    const data = await request.json();
    return { success: true, data };
  } catch (error) {
    console.error('JSON parsing error:', error);
    return { success: false, error: ApiErrors.BadRequest('Invalid JSON format') };
  }
}

/**
 * Log API request for monitoring
 */
export function logApiRequest(
  method: string,
  path: string,
  ip: string,
  userAgent?: string,
  additionalData?: Record<string, unknown>
) {
  const logData = {
    timestamp: new Date().toISOString(),
    method,
    path,
    ip,
    userAgent,
    ...additionalData,
  };

  console.log('API Request:', logData);
}

/**
 * Log API response for monitoring
 */
export function logApiResponse(
  method: string,
  path: string,
  status: number,
  duration: number,
  additionalData?: Record<string, unknown>
) {
  const logData = {
    timestamp: new Date().toISOString(),
    method,
    path,
    status,
    duration: `${duration}ms`,
    ...additionalData,
  };

  console.log('API Response:', logData);
}