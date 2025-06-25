import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { encrypt } from "../../../lib/sodium";
import sodium from "libsodium-wrappers";

const KEY_STRING = "YOUR_BASE64_ENCODED_KEY_HERE";
let KEY: Uint8Array;

const initializeKey = async () => {
  if (!KEY) {
    await sodium.ready;
    KEY = sodium.from_base64(KEY_STRING, sodium.base64_variants.ORIGINAL);
  }
};

export async function POST(req: NextRequest) {
  try {
    await initializeKey();
    const { name, apiKey } = await req.json();

    if (!name || !apiKey) {
      return NextResponse.json(
        { error: "Name and API key are required" },
        { status: 400 }
      );
    }

    const encryptedApiKey = await encrypt(apiKey, KEY);

    await prisma.apiKey.upsert({
      where: { name },
      update: { encrypted_key: encryptedApiKey },
      create: { name, encrypted_key: encryptedApiKey },
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
