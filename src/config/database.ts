import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const successMessage = 'Connected to MongoDB successfully.';
const errorMessage = 'Could not connect to MongoDB.';

const connectDB = (): void => {
    mongoose
    .connect(process.env.MONGODB_URI || '')
    .then(() => console.log(successMessage))
    .catch((error: Error) => console.error(errorMessage +  ` ${error}`));
}

export default connectDB;