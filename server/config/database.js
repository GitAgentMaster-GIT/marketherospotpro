const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // These options are no longer needed in Mongoose 6+
      // but included for compatibility
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📦 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    console.log('\n💡 Quick Fix:');
    console.log('   1. Install MongoDB locally: https://www.mongodb.com/try/download/community');
    console.log('   2. OR use MongoDB Atlas (free): https://www.mongodb.com/cloud/atlas/register');
    console.log('   3. Update MONGODB_URI in your .env file\n');
    
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
