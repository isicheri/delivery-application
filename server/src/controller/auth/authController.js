import  Model,{sequelize}  from "../../database/models";
import {decryptData, hashData} from "../../helper/bcrypt"
import { errorHandler } from "../../middleware/ErrorHandler";
import { sendMail } from "../../services/sendMail";
import { responseHandler } from "../../services/responseHandler";
import { generateNewOtp } from "../../helper/generateNewOtp";
import { generateAccessToken,generateRefreshToken } from "../../helper/generateToken";
import axios from "axios"
import twilio from 'twilio'

const client = twilio(process.env.accountSid,process.env.authToken)

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 * user authentication and authorization
 */
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
        await errorHandler(error);
      return responseHandler(res,500,false,'Something went wrong, try again later',error.stack);
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
        await errorHandler(error);
          return responseHandler(res,500,false,'Something went wrong, try again later',error.stack);
      }
}


export const loginUser = async(req,res) => {
  try {
    const { email } = req.body;
    const user = await Model.User.findOne({
      where: { email: email },
      attributes: { exclude: ['password'] },
    });
    if (user.isVerified) {
      // generate tokens
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      res.cookie('jwt',refreshToken,{
            httpOnly: true,  
            sameSite: 'None',
            secure: true,  
            maxAge: 24 * 60 * 60 * 1000 
      })
      responseHandler(res, 200, true, 'login successful', {user,accessToken});
    } else {
      responseHandler(res, 500, false, 'user is not yet verified', null);
    }
  } catch (error) {
    await errorHandler(error);
    return responseHandler(res,500,false,'Something went wrong, try again later',error.stack);
  }
}


//this is just a simple implementation of a delete operation
export const userDeleteAccount = async(req,res) => {
  try {
    await Model.User.destroy({
      where: {
        id: req.params.id
      }
    })
    responseHandler(res, 200, false, 'user deleted success', null);
  } catch (error) {
    await errorHandler(error);
    return responseHandler(res,500,false,'Something went wrong, try again later',error.stack)
  }
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 * driver authentication and authorization
 */

export const createDriver = async(req,res) => {
  try {
    const trans = await sequelize.transaction();
    const {firstName,lastName,phone,email,vehicleplateNumber,vehiclecType} = req.body;
    const driver  = await Model.Driver.create({firstName,lastName,phone,email,vehicleplateNumber,vehiclecType},{transaction: trans})
      
    const otp = Math.floor(1 + Math.random() * 928201).toString();
    const hashedOtp = await hashData(otp)
    
    await Model.DriverOtp.create({otp: hashedOtp,driverId: driver.id,expiresAt: Date.now() + 30 * (60 * 1000)},
      { transaction: trans }
    );

    const message = `Hi ${firstName}, please use the OTP code: ${otp} to verify your account`;
    const subject = 'Verify your email';
    const send_to = driver.email;
    await sendMail(subject, message, send_to);


    await trans.commit()
    return responseHandler(res,201,true,`driver's created successfully! check your phone number to otp`,null);

  } catch (error) {
    await errorHandler(error)
    res.status(400).json(error)
  }
}

export const verifyDriverOtp = async(req,res) => {
  try {
    const {id} = req.params;
    const {otp} = req.body;

const data = await Model.Driver.findOne({
    where: {
        id: id
    },
    include: [
        {
        model:Model.DriverOtp,
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
        await Model.DriverOtp.destroy({
          where: {
            driverId: id
          }
        })
      }else {
     const decrypted =  await decryptData(otp,data.otp[0].otp);
      if(decrypted) {
        responseHandler(res,200,'successful',null)
    //if the otp is the same just set the user verified state to true
    await Model.Driver.update({ isVerified: 1 }, {
      where: {
        id: id
      }
    });
     //after the user has been verified it would delete the otp
     await Model.DriverOtp.destroy({
        where: {
          driverId: id
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
    await errorHandler(error);
  return responseHandler(res,500,false,'Something went wrong, try again later',error.stack);
}
}

export const loginDriver = async(req,res) => {}