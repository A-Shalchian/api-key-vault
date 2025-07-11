import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { encrypt } from "@/lib/sodium";
import { getEncryptionKey } from "@/lib/encryptionKey";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
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
    const { name, apiKey } = await req.json();

    if (!name || !apiKey) {
      return NextResponse.json(
        { error: "Name and API key are required" },
        { status: 400 }
      );
    }

    const encryptedApiKey = await encrypt(apiKey, KEY);

    const existingKey = await prisma.apiKey.findFirst({
      where: {
        name,
        userId
      }
    });
    
    if (existingKey) {
      await prisma.apiKey.update({
        where: { id: existingKey.id },
        data: { encrypted_key: encryptedApiKey }
      });
    } else {
      await prisma.apiKey.create({
        data: {
          name,
          encrypted_key: encryptedApiKey,
          userId
        }
      });
    }
    
    console.log({
      operation: 'store',
      keyName: name,
      userId,
      success: true,
      timestamp: new Date().toISOString()
    });


    return NextResponse.json(
      { message: "API key stored successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
