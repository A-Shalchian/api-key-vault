import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createServerSupabaseClient } from "@/lib/supabase";
import { encrypt } from "@/lib/sodium";
import sodium from "libsodium-wrappers";

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

export async function POST(req: NextRequest) {
  try {
    // Authenticate the user
    const supabase = createServerSupabaseClient();
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const userId = session.user.id;
    await initializeKey();
    const { name, apiKey } = await req.json();

    if (!name || !apiKey) {
      return NextResponse.json(
        { error: "Name and API key are required" },
        { status: 400 }
      );
    }

    const encryptedApiKey = await encrypt(apiKey, KEY);

    // First try to find if this key name already exists for this user
    const existingKey = await prisma.apiKey.findFirst({
      where: {
        name,
        userId
      }
    });
    
    if (existingKey) {
      // Update existing key
      await prisma.apiKey.update({
        where: { id: existingKey.id },
        data: { encrypted_key: encryptedApiKey }
      });
    } else {
      // Create new key
      await prisma.apiKey.create({
        data: {
          name,
          encrypted_key: encryptedApiKey,
          userId
        }
      });
    }
    
    // Log the API key storage (using console log)
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
