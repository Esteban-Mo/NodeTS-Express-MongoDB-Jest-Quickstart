import mongoose from 'mongoose';

const connectDB = (): void => {
    mongoose
    .connect(process.env.MONGODB_URI || '<your-mongodb-connection-string>')
    .then(() => console.log('Connected to MongoDB successfully.'))
    .catch((error: Error) => console.log(`Could not connect to MongoDB. ERROR: ${error}`));
}

export default connectDB;