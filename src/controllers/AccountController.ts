import {Request, Response, NextFunction} from 'express';
import Account from '../models/AccountModel';
import {hashPassword} from '../services/passwordService';
import {CustomError} from '../middlewares/errorHandler';
import HttpCodes from '../models/HttpCodes';

class AccountController {
    async createAccount(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body;
            const hashedPassword = await hashPassword(password);

            const account = new Account({
                email: email,
                password: hashedPassword
            });

            const savedAccount = await account.save();

            res.json(savedAccount);
        } catch (err) {
            next(new CustomError(HttpCodes.InternalServerError, (err instanceof Error) ? err.message : 'Unknown error', 'AccountController.ts', CustomError.getLineNumber()));
        }
    }

    async getAccounts(req: Request, res: Response, next: NextFunction) {
        try {
            const accounts = await Account.find();
            res.json(accounts);
        } catch (err) {
            next(new CustomError(HttpCodes.InternalServerError, (err instanceof Error) ? err.message : 'Unknown error', 'AccountController.ts', CustomError.getLineNumber()));
        }
    }

    async getAccount(req: Request, res: Response, next: NextFunction) {
        try {
            const account = await Account.findById(req.params.id);
            res.json(account);
        } catch (err) {
            next(new CustomError(HttpCodes.InternalServerError, (err instanceof Error) ? err.message : 'Unknown error', 'AccountController.ts', CustomError.getLineNumber()));
        }
    }

    async updateAccount(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body;

            const hashedPassword = await hashPassword(password);

            const account = await Account.findByIdAndUpdate(req.params.id, {
                email,
                password: hashedPassword
            }, {new: true});

            res.json(account);
        } catch (err) {
            next(new CustomError(HttpCodes.InternalServerError, (err instanceof Error) ? err.message : 'Unknown error', 'AccountController.ts', CustomError.getLineNumber()));
        }
    }

    async deleteAccount(req: Request, res: Response, next: NextFunction) {
        try {
            await Account.findByIdAndDelete(req.params.id);
            res.json({message: 'Account deleted'});
        } catch (err) {
            next(new CustomError(HttpCodes.InternalServerError, (err instanceof Error) ? err.message : 'Unknown error', 'AccountController.ts', CustomError.getLineNumber()));
        }
    }
}

export default new AccountController();
