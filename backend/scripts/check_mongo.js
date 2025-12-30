// backend/scripts/check_mongo.js
// Quick script to test mongoose connection and print detailed errors.
const path = require('path');
// Load .env from backend root so script works when executed from scripts/ or backend/
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || '';

async function run() {
  console.log('Node version:', process.version);
  console.log('OpenSSL version:', process.versions.openssl || 'unknown');
  console.log('Trying to connect to MongoDB using URI:');
  if (!uri) {
    console.log('(MONGODB_URI is empty)');
  } else {
    console.log(uri.replace(/(mongodb\+srv:\/\/[^:]+:)[^@]+(@.+)/, '$1****$2'));
  }

  try {
    await mongoose.connect(uri, {
      // short timeouts for quick feedback
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      // SRV + TLS are default for mongodb+srv; enabling tls options for debug
      tls: true,
    });

    console.log('✅ Mongoose connected successfully');
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Mongoose connection failed');
    console.error('Error name:', err.name);
    console.error('Error message:', err.message);
    // print full error for debugging
    console.error(err);
    // If there is a reason object, print it (driver details)
    if (err.reason) console.error('Reason:', err.reason);
    process.exit(1);
  }
}

run();
