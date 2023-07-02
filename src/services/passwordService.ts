import bcrypt from 'bcrypt';
import {CustomError} from '../middlewares/errorHandler';
import HttpCodes from '../models/HttpCodes';  // Mettez à jour ce chemin d'accès pour pointer vers votre fichier errorHandler

const saltRounds = 10;

export async function hashPassword(password: string): Promise<string> {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw new CustomError(HttpCodes.InternalServerError, 'Failed to hash password', __filename, CustomError.getLineNumber());
    }
}

export async function checkPassword(password: string, hash: string): Promise<boolean> {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        throw new CustomError(HttpCodes.InternalServerError, 'Failed to compare password and hash', __filename, CustomError.getLineNumber());
    }
}