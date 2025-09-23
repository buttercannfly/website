#!/usr/bin/env node

// Script to set up mock authentication for local development
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');

// Read existing .env.local or create new one
let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
}

// Add mock auth environment variable if not already present
if (!envContent.includes('USE_MOCK_AUTH')) {
  envContent += '\n# Mock authentication for development\nUSE_MOCK_AUTH=true\n';
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Added USE_MOCK_AUTH=true to .env.local');
} else {
  console.log('✅ USE_MOCK_AUTH already configured');
}

console.log('\n🎯 Mock Authentication Setup Complete!');
console.log('\nTo use mock authentication:');
console.log('1. Visit /dev-auth to enable/disable mock auth');
console.log('2. Or add ?mock-auth=true to any API request');
console.log('3. Or add x-mock-auth: true header to API requests');
console.log('\nMock user data:');
console.log(JSON.stringify({
  id: 38,
  email: "1710085142@qq.com",
  type: "github",
  credits: 3,
  remaining: 0.9717
}, null, 2));
