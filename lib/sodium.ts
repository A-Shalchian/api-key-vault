import sodium from 'libsodium-wrappers';

export const encrypt = async (message: string, key: Uint8Array): Promise<string> => {
  await sodium.ready;
  const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
  const ciphertext = sodium.crypto_secretbox_easy(message, nonce, key);

  const fullMessage = new Uint8Array(nonce.length + ciphertext.length);
  fullMessage.set(nonce);
  fullMessage.set(ciphertext, nonce.length);

  return sodium.to_base64(fullMessage, sodium.base64_variants.ORIGINAL);
};

export const decrypt = async (encryptedMessage: string, key: Uint8Array): Promise<string> => {
  await sodium.ready;
  const fullMessage = sodium.from_base64(encryptedMessage, sodium.base64_variants.ORIGINAL);
  const nonce = fullMessage.slice(0, sodium.crypto_secretbox_NONCEBYTES);
  const ciphertext = fullMessage.slice(sodium.crypto_secretbox_NONCEBYTES);

  const decrypted = sodium.crypto_secretbox_open_easy(ciphertext, nonce, key);

  return new TextDecoder().decode(decrypted);
};
