import mongoose from "mongoose"

export async function connect() {
    try{
      // Use await so we can observe and report auth/connect errors immediately
      const url = process.env.MONGO_URL;
      if (!url) {
         console.error('MONGO_URL is not set in environment');
         return;
      }

      await mongoose.connect(url);
      const connection = mongoose.connection;
      connection.on('connected', () => {
         console.log('mongo db connected successfully');
      });
      // listen for lower-level errors
      connection.on('error', (err) => {
         console.error('mongo connection error:', err && err.message ? err.message : err);
      });
         } catch (error) {
            const errMsg = (error as any)?.message ?? String(error);
            console.error('Error connecting to MongoDB:', errMsg);
            // rethrow so callers see the error (or exit if you prefer)
            throw error;
         }

}