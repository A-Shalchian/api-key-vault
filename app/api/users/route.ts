import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ErrorCode, createErrorResponse, logApiError } from '@/lib/errorHandler';

export async function POST(request: NextRequest) {
  try {
    const { id, email, firstName, lastName } = await request.json();

    if (!id || !email || !firstName || !lastName) {
      return createErrorResponse({
        code: ErrorCode.BAD_REQUEST,
        message: 'Missing required fields'
      });
    }

    const user = await db.users.create({
      id,
      email,
      first_name: firstName,
      last_name: lastName
    });

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name
        }
      },
      { status: 201 }
    );
  } catch (error) {
    logApiError(error, { route: '/api/users', method: 'POST' });

    if (error instanceof Error && error.message.includes('duplicate key')) {
      return createErrorResponse({
        code: ErrorCode.CONFLICT,
        message: 'User already exists'
      });
    }

    return createErrorResponse({
      code: ErrorCode.INTERNAL_ERROR,
      message: 'Failed to create user'
    });
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return createErrorResponse({
        code: ErrorCode.BAD_REQUEST,
        message: 'User ID is required'
      });
    }

    const user = await db.users.getById(id);
    const apiKeys = await db.apiKeys.getByUserId(id);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        createdAt: user.created_at,
        apiKeys
      }
    });
  } catch (error) {
    logApiError(error, { route: '/api/users', method: 'GET' });
    return createErrorResponse({
      code: ErrorCode.INTERNAL_ERROR,
      message: 'Failed to retrieve user'
    });
  }
}
