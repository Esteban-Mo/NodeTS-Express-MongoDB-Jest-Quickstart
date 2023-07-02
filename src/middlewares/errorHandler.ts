import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import HttpCodes from '../models/HttpCodes';

export class CustomError extends Error {
    public statusCode: number;
    public file: string;
    public line: number;

    constructor(statusCode: number, message: string, file: string, line: number) {
        super(message);
        this.statusCode = statusCode;
        this.file = file;
        this.line = line;
    }

    static getLineNumber() {
        const error = new Error();
        if (error.stack) {
            const line = error.stack.split('\n')[2];
            const lineNumber = line.replace(/^\s+at\s+.+\((.+):(\d+):(\d+)\)$/, '$2');
            return Number(lineNumber);
        }
        return 0;
    }
}

export const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, _: NextFunction): void => {
    if (err instanceof CustomError) {
        console.error(`Error in file ${err.file} at line ${err.line - 1}`);

        const errorResponse = {
            errorCode: err.statusCode,
            error: err.message,
            file: err.file,
            line: err.line - 1
        };

        res.status(err.statusCode).json(errorResponse);
    } else {
        console.error(err.stack);

        const errorResponse = {
            errorCode: HttpCodes.InternalServerError,
            error: 'Une erreur est survenue.',
            file: __filename,
            line: CustomError.getLineNumber()
        };

        res.status(HttpCodes.InternalServerError).json(errorResponse);
    }
};

export default errorHandler;
