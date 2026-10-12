import mongoose from 'mongoose';

let mongodInstance = null;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/xyz_school';
  const isProduction = process.env.NODE_ENV === 'production';

  try {
    console.log(`Connecting to MongoDB...`);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: isProduction ? 10000 : 3000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.warn(`MongoDB connection failed: ${err.message}`);

    // In production, a real MONGODB_URI is required — fail fast
    if (isProduction) {
      console.error('Fatal: MONGODB_URI environment variable must be set in production.');
      throw err;
    }

    // Development fallback: in-memory MongoDB
    if (process.env.AUTO_FALLBACK_MEMORY_DB !== 'false') {
      try {
        console.log('Initiating Development In-Memory MongoDB instance fallback...');
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        mongodInstance = await MongoMemoryServer.create();
        const memoryUri = mongodInstance.getUri();
        const conn = await mongoose.connect(memoryUri);
        console.log(`Development In-Memory MongoDB Connected: ${memoryUri}`);
        return conn;
      } catch (memErr) {
        console.error('Fatal: Failed to start memory MongoDB instance:', memErr.message);
        throw memErr;
      }
    } else {
      throw err;
    }
  }
};
