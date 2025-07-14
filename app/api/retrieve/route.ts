import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { decrypt } from '@/lib/sodium';
import { getEncryptionKey } from '@/lib/encryptionKey';
import { supabase } from '@/lib/supabase';
import { ErrorCode, createErrorResponse, logApiError } from '@/lib/errorHandler';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return createErrorResponse({
        code: ErrorCode.UNAUTHORIZED,
        message: 'Missing or invalid authorization header'
      });
    }
    
    const token = authHeader.split(' ')[1];
    
    const { data: { user }, error: verifyError } = await supabase.auth.getUser(token);
    
    if (verifyError || !user) {
      return createErrorResponse({
        code: ErrorCode.UNAUTHORIZED,
        message: 'Invalid authentication token'
      });
    }
    
    const userId = user.id;
    const KEY = await getEncryptionKey();
    const name = req.nextUrl.searchParams.get('name');

    if (!name) {
      return createErrorResponse({
        code: ErrorCode.BAD_REQUEST,
        message: 'Name parameter is required'
      });
    }

    const apiKeyRecord = await prisma.apiKey.findFirst({
      where: { 
        name,
        userId
      },
    });
    
    if (!apiKeyRecord) {
      return createErrorResponse({
        code: ErrorCode.NOT_FOUND,
        message: 'API key not found'
      });
    }

    const decryptedApiKey = await decrypt(apiKeyRecord.encrypted_key, KEY);

    return NextResponse.json({ apiKey: decryptedApiKey }, { status: 200 });
  } catch (error) {
    logApiError(error, { route: '/api/retrieve', method: 'GET', keyName: req.nextUrl.searchParams.get('name') });
    return createErrorResponse({
      code: ErrorCode.INTERNAL_ERROR,
      message: 'Failed to retrieve API key'
    });
  }
}
