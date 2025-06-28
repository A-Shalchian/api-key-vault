#!/usr/bin/env node

const crypto = require('crypto');

const key = crypto.randomBytes(32);

const base64Key = key.toString('base64');

console.log('Generated encryption key:');
console.log(base64Key);
console.log('\nAdd this to your .env file as:');
console.log('ENCRYPTION_KEY=' + base64Key);
