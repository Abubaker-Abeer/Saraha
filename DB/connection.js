
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
export const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE, 
  process.env.MYSQL_USER,      
  process.env.MYSQL_PASSWORD,  
  {
    host: process.env.MYSQL_HOST,   
    dialect: 'mysql',
  }
);

export const connectdb = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");

    await sequelize.sync();
    console.log("✅ Database synchronized.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};
