import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// 1. Database se connect karne ke liye "Sequelize" ka object banaya
export const sequelize = new Sequelize(
  process.env.DB_NAME,     // Database ka naam
  process.env.DB_USER,     // Username
  process.env.DB_PASSWORD, // Password
  {
    host: process.env.DB_HOST, // Railway ka HOST URL
    port: process.env.DB_PORT, // Railway ka PORT (default isme 3306 nahi hota, alag hota hai)
    dialect: 'mysql',          // Hum MySQL use kar rahe hain
    logging: false,             // फालतू log console me na dikhane ke liye
  }
);

// 2. Connection check karne ka function
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Railway MySQL Connected Successfully!');
  } catch (error) {
    console.error('❌ Connection Failed:', error.message);
  }
};
