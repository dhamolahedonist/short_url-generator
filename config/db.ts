import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI =  process.env.MONGODB_URI

// connect to mongodb
function connectDB() {
 if (typeof MONGODB_URI === 'string') {
  // Connect to MongoDB using Mongoose
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('Connected to MongoDB successfully');
      // Rest of your code
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
} else {
  console.error('Invalid MongoDB URI');
}
}

export default connectDB
