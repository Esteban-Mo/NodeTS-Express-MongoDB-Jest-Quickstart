import express, {Express, Request, Response} from 'express';
import connectDB from './config/database';

const app: Express = express();
const PORT: string | number = process.env.PORT || 3001;

app.use(express.json());
connectDB();

app.get('/', (req: Request, res: Response): void => {
    res.json({
        message: 'Welcome to the Typescript API'
    });
});

app.listen(PORT, (): void => {
    console.log(`Server is running in http://localhost:${PORT}`);
});

export default app;