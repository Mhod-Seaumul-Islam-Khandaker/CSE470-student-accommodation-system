const mongoose = require('mongoose');
async function connectToDatabase() {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        // You can add connection options here if needed
      });
      console.log('MongoDB connected!');
    } catch (error) {
      console.log('MongoDB connection error:', error);
    }
  }
  
// Export the connection function for use in other files
module.exports = connectToDatabase;
  