import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize, connectDB } from './config/db.js';
import contactRoutes from './routes/contactRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MIDDLEWARE
app.use(cors({
  origin: ['https://veltex-v5.vercel.app', 'http://localhost:5173'], // Vercel aur Local dono allow
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Veltex Backend with Sequelize ESM is running!' });
});

// START SERVER
const startServer = async () => {
  try {
    await connectDB();
    await sequelize.sync({ alter: true });
    console.log('✅ Sequelize ESM: All models synced.');

    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(' Failed to start server:', error.message);
  }
};

startServer();
