import { NextResponse } from 'next/server';

// Error codes that map to HTTP status codes
export enum ErrorCode {
  UNAUTHORIZED = 'UNAUTHORIZED',
  NOT_FOUND = 'NOT_FOUND',
  BAD_REQUEST = 'BAD_REQUEST',
  CONFLICT = 'CONFLICT',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}

// Map error codes to HTTP status codes
const ERROR_STATUS_MAP: Record<ErrorCode, number> = {
  [ErrorCode.UNAUTHORIZED]: 401,
  [ErrorCode.NOT_FOUND]: 404,
  [ErrorCode.BAD_REQUEST]: 400,
  [ErrorCode.CONFLICT]: 409,
  [ErrorCode.INTERNAL_ERROR]: 500,
};

// Map error codes to user-friendly messages
const ERROR_MESSAGE_MAP: Record<ErrorCode, string> = {
  [ErrorCode.UNAUTHORIZED]: 'Authentication required',
  [ErrorCode.NOT_FOUND]: 'Resource not found',
  [ErrorCode.BAD_REQUEST]: 'Invalid request',
  [ErrorCode.CONFLICT]: 'Resource conflict',
  [ErrorCode.INTERNAL_ERROR]: 'An unexpected error occurred',
};

// Interface for API errors
export interface ApiError {
  code: ErrorCode;
  message: string;
  details?: Record<string, unknown>;
}

// Function to handle API errors
export function handleApiError(error: unknown): ApiError {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    return error as ApiError;
  }

  if (error instanceof Error) {
    if (error.message.includes('Unique constraint')) {
      return {
        code: ErrorCode.CONFLICT,
        message: 'Resource already exists',
      };
    }
    
  }

  return {
    code: ErrorCode.INTERNAL_ERROR,
    message: 'An unexpected error occurred',
  };
}

// Function to create error responses
export function createErrorResponse(error: ApiError): NextResponse {
  const status = ERROR_STATUS_MAP[error.code] || 500;
  
  return NextResponse.json(
    { 
      error: ERROR_MESSAGE_MAP[error.code] || 'An error occurred',
      code: error.code,
    }, 
    { status }
  );
}

export function logApiError(error: unknown, context: Record<string, unknown> = {}): void {
  const apiError = handleApiError(error);
  
  const sanitizedContext = { ...context };
  
  delete sanitizedContext.token;
  delete sanitizedContext.password;
  delete sanitizedContext.apiKey;
  delete sanitizedContext.encrypted_key;
  
  
  if (process.env.NODE_ENV === 'development') {
    const errorObj = {
      timestamp: new Date().toISOString(),
      errorCode: apiError.code,
      errorMessage: apiError.message,
      context: sanitizedContext,
    };
    
    console.error('API Error:', JSON.stringify(errorObj));
  }
}
