import { responseHandler } from "../services/responseHandler";
import { hashData } from "./bcrypt";
import { sendMail } from "../services/sendMail"; 
import { errorHandler} from "../middleware/ErrorHandler";




export const generateNewOtp = async(id,email,model,res) => {
    try {
         //generate new otp and save
         const otp = Math.floor(1 + Math.random() * 928201).toString();
    const hashedOtp = await hashData(otp)
    
         await model.Otp.create({userId: id,otp: hashedOtp,createdAt: Date.now(),expiresAt: Date.now() + 30 * (60 * 1000)});
         const message = `${email} requested fro a new otp: ${otp}`;
          const subject = 'requested for new otp';
         const send_to = email;
    
         await sendMail(subject,message,send_to)
         return responseHandler(res, 200, true, 'check your email', null);
    
    }catch(err) {
        await errorHandler(err)
        responseHandler(res,500,false,'Something went wrong, try again later',err.stack)
    }
    }