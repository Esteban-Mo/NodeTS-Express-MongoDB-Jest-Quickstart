import express, {Express, Request, Response} from 'express';
import connectDB from './config/database';
import accountRoutes from './routes/accountRoutes';
import errorHandler from './middlewares/errorHandler';

const app: Express = express();
const PORT: string | number = process.env.PORT || 3001;

app.use(express.json());
connectDB();

app.use('/account', accountRoutes);

app.get('/', (req: Request, res: Response): void => {
    res.json({
        message: 'Welcome to the Typescript API'
    });
});

app.use(errorHandler);

app.listen(PORT, (): void => {
    console.log(`Server is running in http://localhost:${PORT}`);
});