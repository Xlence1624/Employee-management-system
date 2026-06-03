
import "dotenv/config";
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import connectDb from './config/db.js';
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"

import authRouter from './routes/authRoutes.js';
import employeeRouter from './routes/employeeRoutes.js';
import profileRouter from './routes/profileRoutes.js';
import attendanceRouter from './routes/attendanceRoutes.js';
import leaveRouter from './routes/leaveRoutes.js';
import payslipRouter from './routes/payslipsRoutes.js';
import dashboardRouter from './routes/dashBoardRoutes.js';

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
app.use("/api/leave", leaveRouter)
app.use("/api/payslips", payslipRouter)
app.use("/api/dashboard", dashboardRouter)
app.use("/api/inngest", serve({ client: inngest, functions }));
await connectDb();
// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});