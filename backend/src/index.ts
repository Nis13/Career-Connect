import express, { Request, Response } from 'express';
import routes from "./routes/index";
import config from './config';
import cors from "cors";
import path from 'path';

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173"
  })
);

app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));
app.use('/resumes', express.static(path.join(__dirname, '../public/resumes')));

app.use('/', routes);

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
