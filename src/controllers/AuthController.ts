import {NextFunction, Request, Response} from 'express';
import {checkPassword} from '../services/passwordService';
import HttpCodes from '../models/HttpCodes';
import Account from '../models/AccountModel';
import {CustomError} from '../middlewares/errorHandler';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {email, password} = req.body;

        const account = await Account.findOne({email});

        if (!account) {
            return next(new CustomError(HttpCodes.NotFound, 'Account not found', 'AuthController.ts', CustomError.getLineNumber()));
        }

        const isPasswordValid: boolean = await checkPassword(password, account.password);

        if (!isPasswordValid) {
            return next(new CustomError(HttpCodes.Unauthorized, 'Invalid password', 'AuthController.ts', CustomError.getLineNumber()));
        }

        const payload:{userId: any, email: string} = {userId: account._id, email: account.email};
        const token: string = jwt.sign(payload, process.env.JWT_SECRET_KEY || 'yourSecretKey$', {expiresIn: '12h'});

        res.status(HttpCodes.OK).json({message: 'Logged in successfully', token});
    } catch (err) {
        next(new CustomError(HttpCodes.InternalServerError, (err instanceof Error) ? err.message : 'Unknown error', 'AuthController.ts', CustomError.getLineNumber()));
    }
};

export const checkTokenValidity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token: string | undefined = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return next(new CustomError(HttpCodes.Unauthorized, 'No token provided', 'AuthController.ts', CustomError.getLineNumber()));
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY || 'yourSecretKey$', (err: jwt.VerifyErrors | null, decodedToken: any) => {
            if (err || !decodedToken) {
                return next(new CustomError(HttpCodes.Unauthorized, 'Invalid token', 'AuthController.ts', CustomError.getLineNumber()));
            } else {
                const now: number = Math.floor(Date.now() / 1000);
                const remainingTime: number = (decodedToken.exp - now) * 1000;

                res.status(HttpCodes.OK).json({message: 'Token is valid', remainingTime});
            }
        });

    } catch (err) {
        next(new CustomError(HttpCodes.InternalServerError, (err instanceof Error) ? err.message : 'Unknown error', 'AuthController.ts', CustomError.getLineNumber()));
    }
};