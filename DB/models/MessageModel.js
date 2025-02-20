import { DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';

const MessageModel = sequelize.define(
  'MessageModel',
  {
    MessageID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Message: {
      type: DataTypes.STRING,
      required: true,
    },
    receiverid: {
        type: DataTypes.INTEGER,
        required: true,
    }
  },
  {
    timestamps: false, 
  });

export default MessageModel;
