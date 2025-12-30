// backend/scripts/create_admin.js
// Usage:
//   node create_admin.js --email admin@jobfinder.com --password Password123! --name "Admin System"

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

function parseArgs() {
  const argv = process.argv.slice(2);
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const val = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : true;
      out[key] = val;
      if (val !== true) i++;
    }
  }
  return out;
}

async function run() {
  const args = parseArgs();
  const email = args.email || process.env.CREATE_ADMIN_EMAIL || 'admin@jobfinder.com';
  const password = args.password || process.env.CREATE_ADMIN_PASSWORD || 'Password123!';
  const name = args.name || process.env.CREATE_ADMIN_NAME || 'Admin System';
  const phone = args.phone || process.env.CREATE_ADMIN_PHONE || '0900000000';
  const force = Boolean(args.force || process.env.CREATE_ADMIN_FORCE === 'true');

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI is not set in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    console.log('Connected to MongoDB');

    let existing = await User.findOne({ email });
    if (existing) {
      if (!force) {
        console.log(`User with email ${email} already exists (id=${existing._id}). Use --force to update password.`);
        await mongoose.disconnect();
        process.exit(0);
      }

      // update existing user
        // Do NOT pre-hash here; the User model has a pre-save hook that hashes passwords.
        existing.hoVaTen = name;
        existing.matKhau = password;
      existing.soDienThoai = phone;
      existing.vaiTro = 'quan_tri_he_thong';
      existing.trangThai = 'hoat_dong';
      await existing.save();
      console.log('Existing admin user updated:');
      console.log(`  email: ${email}`);
      console.log(`  password: ${password}`);
      console.log(`  id: ${existing._id}`);
      await mongoose.disconnect();
      process.exit(0);
    }

    // Do NOT pre-hash; leave plaintext here so pre-save middleware hashes it once.
    const user = new User({
      hoVaTen: name,
      email,
      matKhau: password,
      soDienThoai: phone,
      vaiTro: 'quan_tri_he_thong',
      trangThai: 'hoat_dong'
    });

    await user.save();
    console.log('Admin user created:');
    console.log(`  email: ${email}`);
    console.log(`  password: ${password}`);
    console.log(`  id: ${user._id}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin user:', err && err.message ? err.message : err);
    process.exit(1);
  }
}

run();
