import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// 1. Database se connect karne ke liye "Sequelize" ka object banaya
export const sequelize = new Sequelize(
  process.env.DB_NAME,     
  process.env.DB_USER,     
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT || 3306, 
    dialect: 'mysql',          
    logging: false,             
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false // Railway aur Render ke liye ye line Zaroori hai!
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
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
