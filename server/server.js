import express from 'express';
import cors from 'cors';
import multer from 'multer';
import connectDb from './config/db.js';

import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(multer().none());

// routes
app.get('/', (req, res) => {
  res.send('Backend development commenced!');
});
await connectDb();
// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});