import sodium from 'libsodium-wrappers';

/**
 * Retrieves the symmetric encryption key used for sealing / opening API keys.
 *
 * Behaviour:
 *  – In production (`NODE_ENV === 'production'`):
 *      • `ENCRYPTION_KEY` MUST be present and valid base64. Otherwise an error is thrown.
 *  – In development: if `ENCRYPTION_KEY` is missing or invalid you may opt-in to a randomly
 *    generated throw-away key by setting `ALLOW_DEV_RANDOM_KEY=true`.  This makes it clear the
 *    data will not survive a server restart and is safe only for local testing.
 */
let cachedKey: Uint8Array | null = null;

export const getEncryptionKey = async (): Promise<Uint8Array> => {
  if (cachedKey) return cachedKey;

  await sodium.ready;

  const keyString = process.env.ENCRYPTION_KEY;
  const allowDevRandom = process.env.ALLOW_DEV_RANDOM_KEY === 'true';
  const isProd = process.env.NODE_ENV === 'production';

  const generateDevKey = () => {
    const devKey = sodium.randombytes_buf(sodium.crypto_secretbox_KEYBYTES);
    console.warn('[encryption] Using a randomly generated key for this session. Stored data will not be decryptable after restart.');
    return devKey;
  };

  if (!keyString) {
    if (!isProd && allowDevRandom) {
      cachedKey = generateDevKey();
      return cachedKey;
    }
    throw new Error('ENCRYPTION_KEY environment variable is not set');
  }

  try {
    cachedKey = sodium.from_base64(keyString, sodium.base64_variants.ORIGINAL);
    return cachedKey;
  } catch (err) {
    console.error('[encryption] Error decoding ENCRYPTION_KEY:', err);
    if (!isProd && allowDevRandom) {
      cachedKey = generateDevKey();
      return cachedKey;
    }
    throw new Error('Invalid ENCRYPTION_KEY format; must be valid base64');
  }
};
