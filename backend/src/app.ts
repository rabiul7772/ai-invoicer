import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { FRONTEND_URL, PORT } from './config/env.js';
import { connectDB } from './config/database.js';
import errorMiddleware from './middlewares/error.middleware.js';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import userRouter from './routes/user.routes.js';
import invoiceRouter from './routes/invoice.routes.js';
import aiRouter from './routes/ai.routes.js';
import dashboardRouter from './routes/dashboard.routes.js';

const app = express();
app.set('trust proxy', 1);

if (!FRONTEND_URL || !PORT) {
  throw new Error('FRONTEND_URL or PORT is not defined in .env file');
}

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(arcjetMiddleware);

// Routers
app.use('/api/v1/user', userRouter);
app.use('/api/v1/invoices', invoiceRouter);
app.use('/api/v1/ai', aiRouter);
app.use('/api/v1/dashboard', dashboardRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'AI Invoicer API is running'
  });
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
