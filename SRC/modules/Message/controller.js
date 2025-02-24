import user from '../../../DB/models/UserModel.js';
import message from '../../../DB/models/MessageModel.js';
import {AppError} from '../../../SRC/utils/AppError.js';

export const sendMessage = async (req, res, next) => {

    const {receiverid}=req.params;
    const {Message } = req.body;

    if (!Message) {
      return next(new AppError(400, "Receiver ID and message content are required"));
    }
    const founduser=await user.findByPk(receiverid);
    if(!founduser ){
        return next(new AppError(404, "User not found"));
    }
     const newmessage=await message.create({receiverid,Message,});
  
      return res.status(201).json({ message: "Message sent successfully" });
  

};
export const getMessage = async (req, res, next) => {
    const messages = await message.findAll({ ReceiverID: req.id });
      return res.status(200).json({ messages });
  
};
export const deleteMessage = async (req, res, next) => {
    const receiverid=req.id;
    const{MessageID} = req.params;


    const messageToDelete = await message.findOne({
        where: { MessageID, receiverid }
      });
  
      if (!messageToDelete) {
        return next(new AppError(404, "Message not found or unauthorized"));
      }
  
      await messageToDelete.destroy();
  
    
    return res.status(200).json({ message: "Message deleted successfully" });
};

