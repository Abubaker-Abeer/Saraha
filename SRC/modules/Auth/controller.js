import bcrypt  from 'bcryptjs';
import jwt from "jsonwebtoken"; 
import user from '../../../DB/models/UserModel.js';
import { sendemail } from "../../utils/sendemail.js";
import {AppError} from '../../../SRC/utils/AppError.js';
export const Register = async (req, res, next) => {
  try {
    const { UserName, Email, Passwords } = req.body;

    if (!UserName || !Email || !Passwords) {
      return next(new AppError(400, "All fields are required"));
    }
    const existingUser = await user.findOne({ where: { Email } });
    if (existingUser) {
      return next(new AppError(400, "Email already exists"));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Passwords, salt);

    const token = jwt.sign({ Email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    const link = `http://localhost:3000/auth/confirmEmail/${token}`;
    await sendemail(Email, 'Confirm Email', `<a href="${link}"><strong>Verify Your Email</strong></a>`);

    await user.create({
      UserName,
      Email,
      Passwords: hashedPassword,
      confirmEmail: false, 
    });

    return res.status(201).json({ message: "Registration successful. Please check your email to verify your account." });

  } catch (error) {
    next(error);
  }
};

  
export const confirmEmail = async (req, res, next) => {
  try {
    const { token } = req.params;
    console.log("Token received:", token); 

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); 

  
    const foundUser = await user.findOne({ where: { Email: decoded.Email } });

    if (!foundUser) {
      console.log("User not found");
      return next(new AppError(404, "User not found or already verified"));
    }

    
    if (foundUser.confirmEmail) {
      console.log("Email is already confirmed");
      return res.status(400).json({ message: "Email is already confirmed." });
    }

    console.log("Updating confirmEmail...");
  
    const updated = await user.update(
      { confirmEmail: true },
      { where: { Email: decoded.Email } }
    );

    console.log("Update result:", updated);

    if (updated[0] === 0) {
      console.log("Failed to update email confirmation.");
      return next(new AppError(500, "Failed to update email confirmation."));
    }

    console.log("Email confirmed successfully.");
    return res.status(200).json({ message: "Email confirmed successfully. You can now log in." });

  } catch (error) {
    console.log("Error:", error);
    next(new AppError(400, "Invalid or expired token"));
  }
};


export const login = async (req, res, next) => {
  try {
      const { Email, Passwords } = req.body;
      
      const foundUser = await user.findOne({ where: { Email } });
      if (!foundUser) {
        return next(new AppError(400,"Invalid email"));
      }
      else{
        if(!foundUser.confirmEmail){
          return next(new AppError(400,"Please confirm your email")); 
        }
        const isPasswordValid = await bcrypt.compare(Passwords, foundUser.Passwords);
        if (!isPasswordValid) {
            return next(new AppError(400,"Invalid password"));
        }
  
      const token = jwt.sign({ id: foundUser.UserID, email: foundUser.Email, UserName: foundUser.UserName}, "your-secret-key", { expiresIn: "1h" }
        );
        return res.status(200).json({ message: "Login successful", token });
      }
     

  } catch (error) {
      next(error); 
  }
};

