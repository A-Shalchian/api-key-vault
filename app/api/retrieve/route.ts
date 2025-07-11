import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { decrypt } from '@/lib/sodium';
import { getEncryptionKey } from '@/lib/encryptionKey';
import { supabase } from '@/lib/supabase';








export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No authorization header');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const token = authHeader.split(' ')[1];
    
    const { data: { user }, error: verifyError } = await supabase.auth.getUser(token);
    
    if (verifyError || !user) {
      console.log('Token verification error:', verifyError || 'No user found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const userId = user.id;
    const KEY = await getEncryptionKey();
    const name = req.nextUrl.searchParams.get('name');

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const apiKeyRecord = await prisma.apiKey.findFirst({
      where: { 
        name,
        userId
      },
    });
    
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
