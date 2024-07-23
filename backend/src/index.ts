import express, { Request, Response } from 'express';
import routes from "./routes/index";
import config from './config';
import cors from "cors";


const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173"
  })
);

app.use('/', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Job Portal API!');
});

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
