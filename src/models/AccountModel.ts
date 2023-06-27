import {Schema, model, Document} from 'mongoose';

interface Account extends Document {
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const accountSchema = new Schema<Account>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export default model<Account>('Account', accountSchema);