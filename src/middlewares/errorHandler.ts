import {ErrorRequestHandler, NextFunction, Request, Response} from 'express';
import app from '../index';
import HttpCodes from '../models/HttpCodes';

class CustomError extends Error {
    public statusCode: number;
    public file: string;
    public line: number;

    constructor(statusCode: number, message: string, file: string, line: number) {
        super(message);
        this.statusCode = statusCode;
        this.file = file;
        this.line = line;
    }
}

const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, _: NextFunction): void => {
    if (err instanceof CustomError) {
        console.error(`Error in file ${err.file} at line ${err.line}`);
        res.status(err.statusCode).send({message: err.message});
    } else {
        console.error(err.stack);
        res.status(HttpCodes.InternalServerError).send({message: 'Une erreur est survenue.'});
    }
};

app.use(errorHandler);