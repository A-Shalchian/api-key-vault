import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { supabase } from '../../../lib/supabase';
import { decrypt } from '../../../lib/sodium';
import sodium from 'libsodium-wrappers';


const KEY_STRING = 'YOUR_BASE64_ENCODED_KEY_HERE'; 
let KEY: Uint8Array;

const initializeKey = async () => {
  if (!KEY) {
    await sodium.ready;
    KEY = sodium.from_base64(KEY_STRING, sodium.base64_variants.ORIGINAL);
  }
};

export async function GET(req: NextRequest) {
  try {
    await initializeKey();
    const name = req.nextUrl.searchParams.get('name');

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const apiKeyRecord = await prisma.apiKey.findUnique({
      where: { name },
    });
    
    await supabase
      .from('api_key_logs')
      .insert({
        operation: 'retrieve',
        key_name: name,
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
