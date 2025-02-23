import nodemailer from 'nodemailer';
import crypto from 'crypto';
const transporter = nodemailer.createTransport({
  service:'gmail',
   auth: {
     user: "abeerabubaker2001@gmail.com",
     pass: "tsvq gead qtcm pihz",
   },
    tls: {
    rejectUnauthorized: false 
  }
 });
export async function sendemail(to){
       const info = await transporter.sendMail({
         from: '"Abeer Abubaker" <abeerabubaker2001@gmail.com>', 
         to, 
         subject: "welcom", 
         html: "<bh2>Hello world?</h2>", 
       });
}
export const sendResetPasswordEmail = async (email, resetCode) => {
  const mailOptions = {
    from: 'abeerabubaker2001@gmail.com', // Your email address
    to:   email,
    subject: 'Password Reset Request',
    html: `<h1>Reset your password?</h1> 
    <p>
    You have requested a password reset. 
    use the confirmation code below to complete the process. If you didn't make this request, ignore this email.
    <p>${resetCode}</p>
    </p>`,
  };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
 
};

export const generateUniqueCode = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';

  while (code.length < length) {
    const randomBytes = crypto.randomBytes(1);
    const randomIndex = randomBytes[0] % characters.length;
    code += characters.charAt(randomIndex);
  }

  return code;
};
