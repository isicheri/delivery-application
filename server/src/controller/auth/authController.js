import  Model,{sequelize}  from "../../database/models";
import {hashData} from "../../helper/bcrypt"
import { errorHandler } from "../../middleware/ErrorHandler";
import { sendMail } from "../../services/sendMail";
import { responseHandler } from "../../services/responseHandler";



//register user to the system
export const createUser = async(req,res) => {
    try {
      const trans = await sequelize.transaction();
        const {firstName,lastName,email,password,phone} = req.body;

        const hashedPassword = await hashData(password)

        const user  = await Model.User.create({firstName,lastName,email,password:hashedPassword,phone},{transaction: trans})

    const otp = Math.floor(1 + Math.random() * 928201).toString();
    const hashedOtp = await hashData(otp)
    
    await Model.Otp.create({otp: hashedOtp,userId: user.id},
      { transaction: trans }
    );


    //send a mail
    const message = `Hi ${firstName}, please use the OTP code: ${otp} to verify your account`;
    const subject = 'Verify your email';
    const send_to = user.email;
    await sendMail(subject, message, send_to);

    await trans.commit()


    return responseHandler(res,201,true,'User created successfully! check email to verify otp',null);

        
    } catch (error) {
        await errorHandler(error)
        res.status(400).json(error)
    }
}


export const getUsers = async(req,res) => {
try {
    const user = await Model.User.findAll({
        include: [
            {
            model:Model.Order,
            as: 'Orders' // Use the correct alias
            }
        ]
    });
    res.status(200).json(user)
} catch (error) {
    console.error('SequelizeEagerLoadingError:', error);
    res.status(400).json(error)
}
}


//change valu to human readable date and time
/**
 * const timestamp = 1693624717497; // Replace this with your timestamp

// Create a new Date object using the timestamp
const date = new Date(timestamp);

// Extract the different components of the date (year, month, day, hour, minute, second)
const year = date.getFullYear();
const month = date.getMonth() + 1; // Months are zero-based, so add 1
const day = date.getDate();
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();

// Create a human-readable date string
const dateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

console.log(dateString);
 */