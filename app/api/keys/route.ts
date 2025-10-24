import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
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

    const apiKeys = await db.apiKeys.getByUserId(userId);

    const decrypted = await Promise.all(
      apiKeys.map(async ({ id, name, encrypted_key, created_at }) => ({
        id,
        name,
        apiKey: await decrypt(encrypted_key, KEY),
        createdAt: created_at,
      }))
    );

    return NextResponse.json({ keys: decrypted }, { status: 200 });
  } catch (error) {
    logApiError(error, { route: '/api/keys', method: 'GET' });
    return createErrorResponse({
      code: ErrorCode.INTERNAL_ERROR,
      message: 'Failed to retrieve API keys'
    });
  }
}
