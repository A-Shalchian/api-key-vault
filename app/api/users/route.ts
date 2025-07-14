import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { ErrorCode, createErrorResponse, logApiError } from '@/lib/errorHandler';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { id, email, firstName, lastName } = await request.json();

    if (!id || !email || !firstName || !lastName) {
      return createErrorResponse({
        code: ErrorCode.BAD_REQUEST,
        message: 'Missing required fields'
      });
    }
    
    const user = await prisma.user.create({
      data: {
        id,
        email,
        firstName,
        lastName
      },
    });

    return NextResponse.json(
      { 
        message: 'User created successfully',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        }
      },
      { status: 201 }
    );
  } catch (error) {
    logApiError(error, { route: '/api/users', method: 'POST' });
    
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return createErrorResponse({
        code: ErrorCode.CONFLICT,
        message: 'User already exists'
      });
    }
    
    return createErrorResponse({
      code: ErrorCode.INTERNAL_ERROR,
      message: 'Failed to create user'
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id },
      include: { apiKeys: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error retrieving user:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve user' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
