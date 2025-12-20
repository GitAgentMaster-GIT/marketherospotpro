require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const MONGODB_URI = process.env.MONGODB_URI;

async function resetUser() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Delete all existing users
    await User.deleteMany({});
    console.log('🗑️  Deleted all existing users');

    // Create a fresh user with known credentials
    const user = await User.create({
      name: 'Demo User',
      email: 'demo@example.com',
      password: 'Demo123456'
    });

    console.log('✅ Created new user:');
    console.log('   Email: demo@example.com');
    console.log('   Password: Demo123456');
    console.log('   User ID:', user._id);

    await mongoose.connection.close();
    console.log('\n✅ Done! You can now login with these credentials.');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

resetUser();
