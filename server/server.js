import express from 'express';
import cors from 'cors';
import multer from 'multer';
import connectDb from './config/db.js';

import "dotenv/config";
import authRouter from './routes/authRoutes.js';
import employeeRouter from './routes/EmployeeRoutes.js';
import profileRouter from './routes/profileRoutes.js';
import attendanceRouter from './routes/attendanceRoutes.js';

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
app.use("/api/auth", authRouter)
app.use("/api/employees", employeeRouter)
app.use("/api/profile", profileRouter)
app.use("/api/attendance", attendanceRouter)

await connectDb();
// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});