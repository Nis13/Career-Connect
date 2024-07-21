import { Request, Response } from 'express';

const jobs = [
  { id: 1, title: 'Software Engineer', description: 'Develop software solutions.' },
  { id: 2, title: 'Product Manager', description: 'Manage product lifecycle.' },
];

export const getJobs = (req: Request, res: Response) => {
  res.json(jobs);
};
