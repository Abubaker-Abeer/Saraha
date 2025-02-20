import { Sequelize } from 'sequelize';
export const sequelize = new Sequelize('Saraha', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});
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
