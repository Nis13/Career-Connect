import express, { Request, Response } from 'express';
import routes from "./routes/index";
import config from './config';


const app = express();

app.use(express.json());
app.use('/', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Job Portal API!');
});

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
