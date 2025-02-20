import { DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';

const UserModel = sequelize.define(
  'UserModel',
  {
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserName: {
      type: DataTypes.STRING,
    },
    Email: {
      type: DataTypes.STRING,
      unique: true,
    },
    Passwords: {
      type: DataTypes.STRING,
      required: true,
    },
    confirmEmail: {
        type: DataTypes.BOOLEAN,
        default: false,
    }
  },
  {
    timestamps: false, 
  });

export default UserModel;
