import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createServerSupabaseClient } from '@/lib/supabase';
import { decrypt } from '@/lib/sodium';
import sodium from 'libsodium-wrappers';


// Get encryption key from environment variable
let KEY: Uint8Array;

const initializeKey = async () => {
  if (!KEY) {
    await sodium.ready;
    const keyString = process.env.ENCRYPTION_KEY;
    if (!keyString) {
      throw new Error('ENCRYPTION_KEY environment variable is not set');
    }
    KEY = sodium.from_base64(keyString, sodium.base64_variants.ORIGINAL);
  }
};

export async function GET(req: NextRequest) {
  try {
    // Authenticate the user
    const supabase = createServerSupabaseClient();
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const userId = session.user.id;
    await initializeKey();
    const name = req.nextUrl.searchParams.get('name');

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    // Find API key that belongs to the authenticated user
    const apiKeyRecord = await prisma.apiKey.findFirst({
      where: { 
        name,
        userId
      },
    });
    
    // Log the API key retrieval attempt (using console log since apiKeyLog model doesn't exist)
    console.log({
      operation: 'retrieve',
      keyName: name,
      userId,
      success: !!apiKeyRecord,
      timestamp: new Date().toISOString()
    });

    if (!apiKeyRecord) {
      return NextResponse.json({ error: 'API key not found' }, { status: 404 });
    }

    const decryptedApiKey = await decrypt(apiKeyRecord.encrypted_key, KEY);

    return NextResponse.json({ apiKey: decryptedApiKey }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
