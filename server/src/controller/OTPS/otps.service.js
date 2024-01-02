import { generateNewOtp } from "../../helper/generateNewOtp";
import { responseHandler } from "../../services/responseHandler";
import { errorHandler } from "../../middleware/ErrorHandler";

export const verifyOtp = async(req,res,Model) => {
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