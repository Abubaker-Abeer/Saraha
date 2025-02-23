import bcrypt  from 'bcryptjs';import jwt from "jsonwebtoken"; 
import user from '../../../DB/models/UserModel.js';
import { sendemail } from "../../utils/sendemail.js";
import {AppError} from '../../../SRC/utils/AppError.js';
export const Register = async (req, res,next) => {
  
        const { UserName, Email, Passwords } = req.body;
        var salt = bcrypt.genSaltSync(8);
        const hash = bcrypt.hashSync(Passwords, salt);
        if (!UserName || !Email || !Passwords) {
        return next(new AppError(400, "All fields are required"));
        }
       const existingUser = await user.findOne({ where: { Email } });
       if (existingUser) {
        return next(new AppError(400,"email already exists"));
          }
        await user.create({ UserName, Email, Passwords: hash });
  
        return res.status(201).json({ message: "success" });
    
  }
export const login = async (req, res, next) => {
  try {
      const { Email, Passwords } = req.body;
      
      const foundUser = await user.findOne({ where: { Email } });
      if (!foundUser) {
        return next(new AppError(400,"Invalid email"));
      }
      const isPasswordValid = await bcrypt.compare(Passwords, foundUser.Passwords);
      if (!isPasswordValid) {
          return next(new AppError(400,"Invalid password"));
      }

    const token = jwt.sign({ id: foundUser.UserID, email: foundUser.Email, UserName: foundUser.UserName}, "your-secret-key", { expiresIn: "1h" }
      );

      sendemail(Email);
      return res.status(200).json({ message: "Login successful", token });

  } catch (error) {
      next(error); 
  }
};

export const forgotPassword = async (req, res) => {
    try {
  
        const { email } = req.body;
    
          const user = await user.findOne({ where: { Email: email } });
    
          if (!user) {
            return next(new AppError(400,"No User found with this Email"));
          }
    
          const resetCode = generateUniqueCode(10);
          const codeHash = await bcrypt.hash(resetCode, 10);
          console.log(resetCode);
          await sendResetPasswordEmail(email, resetCode);
    
          const code = await Code.create({
            userId: user.UserID,
            codeHash: codeHash,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000), 
            createdAt: new Date(),
          });
    
          res.status(200).json({
            message: 'Password reset email sent',
            userId: user.UserID, 
          });
  
      } catch (error) {
        console.error(error);
        res.status(500).json('Password reset request failed');
      }
  };