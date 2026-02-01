// Helper script to generate a secure TOKEN_SECRET
const crypto = require('crypto');

const secret = crypto.randomBytes(32).toString('hex');
console.log('\n🔐 Generated TOKEN_SECRET:');
console.log(secret);
console.log('\n📝 Copy this and add it to your Vercel environment variables as TOKEN_SECRET\n');


