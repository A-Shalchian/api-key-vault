import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { encrypt } from "@/lib/sodium";
import { getEncryptionKey } from "@/lib/encryptionKey";
import { supabase } from "@/lib/supabase";
import { ErrorCode, createErrorResponse, logApiError } from '@/lib/errorHandler';

export async function POST(req: NextRequest) {
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
    const { name, apiKey } = await req.json();

    if (!name || !apiKey) {
      return createErrorResponse({
        code: ErrorCode.BAD_REQUEST,
        message: 'Name and API key are required'
      });
    }

    const encryptedApiKey = await encrypt(apiKey, KEY);

    const existingKey = await db.apiKeys.getByName(userId, name);

    if (existingKey) {
      await db.apiKeys.update(existingKey.id, { encrypted_key: encryptedApiKey });
    } else {
      await db.apiKeys.create({
        user_id: userId,
        name,
        encrypted_key: encryptedApiKey
      });
    }

    return NextResponse.json(
      { message: "API key stored successfully" },
      { status: 201 }
    );
  } catch (error) {
    logApiError(error, { route: '/api/store', method: 'POST' });
    return createErrorResponse({
      code: ErrorCode.INTERNAL_ERROR,
      message: 'Failed to store API key'
    });
  }
}
