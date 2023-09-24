import  Model,{sequelize}  from "../../database/models";
import {decryptData, hashData} from "../../helper/bcrypt"
import { errorHandler } from "../../middleware/ErrorHandler";
import { sendMail } from "../../services/sendMail";
import { responseHandler } from "../../services/responseHandler";
import { generateNewOtp } from "../../helper/generateNewOtp";



//register user to the system
export const createUser = async(req,res) => {
    try {
      const trans = await sequelize.transaction();
        const {firstName,lastName,email,password,phone} = req.body;

        const hashedPassword = await hashData(password)

        const user  = await Model.User.create({firstName,lastName,email,password:hashedPassword,phone},{transaction: trans})

    const otp = Math.floor(1 + Math.random() * 928201).toString();
    const hashedOtp = await hashData(otp)
    
    await Model.Otp.create({otp: hashedOtp,userId: user.id,expiresAt: Date.now() + 30 * (60 * 1000)},
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


export const verifyOtp = async(req,res) => {
    try {
        const {id} = req.params;
        const {otp} = req.body;

    const data = await Model.User.findOne({
        where: {
            id: id
        },
        include: [
            {
            model:Model.Otp,
            as: 'otp' // Use the correct alias
            }
        ]
    })

    const currentTime = Date.now();
    
    if(!data) {
        responseHandler(res,500,false,"request for a new otp",null)
    }else {
        if(data.otp[0].expiresAt < currentTime) {
            responseHandler(res,400,false,'otp already expired!.request for a new otp',null);
            await Model.Otp.destroy({
              where: {
                userId: id
              }
            })
          }else {
         const decrypted =  await decryptData(otp,data.otp[0].otp);
          if(decrypted) {
            responseHandler(res,200,'successful',null)
        //if the otp is the same just set the user verified state to true
        await Model.User.update({ isVerified: 1 }, {
          where: {
            id: id
          }
        });
         //after the user has been verified it would delete the otp
         await Model.Otp.destroy({
            where: {
              userId: id
            }
          })
          }else {
        responseHandler(res,400,'incorrect otp passed,try again!',null)
      }
          }
    }

    // console.log(user.otp[0].otp);

    // res.status(200).json(user)

    } catch (error) {
        throw error
    }
}

export const requestOtp = async(req,res) => {
    try {
        const {id} = req.params;
        const user = await Model.User.findOne({
          where: { id: id }
        });
        // await generateNewOtp(id,user.email,Model,res);
        await generateNewOtp(id,user.email,Model,res)
      } catch (error) {
        await errorHandler(err);
          return responseHandler(res,500,false,'Something went wrong, try again later',err.stack);
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