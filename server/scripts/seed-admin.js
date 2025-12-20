require('dotenv').config();
const mongoose = require('mongoose');
const crypto = require('crypto');
const User = require('../models/User');

async function run() {
  const MONGODB_URI = process.env.MONGODB_URI;
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'marketherospotpro@gmail.com';
  const ADMIN_NAME = process.env.ADMIN_NAME || 'MarketHeroSpotPro Admin';
  const password = process.env.ADMIN_PASSWORD || `Admin-${crypto.randomBytes(4).toString('hex')}-!123`;

  if (!MONGODB_URI) {
    console.error('❌ Missing MONGODB_URI');
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  let user = await User.findOne({ email: ADMIN_EMAIL });
  if (!user) {
    user = await User.create({ name: ADMIN_NAME, email: ADMIN_EMAIL, password });
    console.log('👤 Created admin user');
  } else {
    console.log('ℹ️ Admin user already exists');
  }

  user.role = 'admin';
  await user.save();

  console.log('\n✅ Admin seeded/updated');
  console.log('   Email:', ADMIN_EMAIL);
  console.log('   Temp Password:', password);
  console.log('   Role:', user.role);

  await mongoose.connection.close();
  console.log('\n🏁 Done');
}

run().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
