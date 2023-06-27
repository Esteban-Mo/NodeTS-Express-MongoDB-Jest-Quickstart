import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = (): void => {
    mongoose
    .connect(process.env.MONGODB_URI || '<your-mongodb-connection-string>')
    .then(() => console.log('Connected to MongoDB successfully.'))
    .catch((error: Error) => console.error(`Could not connect to MongoDB. ERROR: ${error}`));
}

export default connectDB;