import express, { Request, Response } from 'express';
import jobRoutes from './routes/jobRoutes';
import config from './config';


const app = express();

app.use(express.json());
app.use('/api', jobRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Job Portal API!');
});

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
