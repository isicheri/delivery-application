import JWT from 'jsonwebtoken'
import { errorHandler } from '../../middleware/ErrorHandler';
import { responseHandler } from '../../services/responseHandler';

export const verifyToken = async (req,res,next) => {
    try {
        const authHeader = req.headers.authorization;
        if(authHeader.length == 0 && !authHeader.toLowerCase().startsWith('bearer')) {
            responseHandler(res,400,false,'user cannot perform this operation',null)
        }else {
        let token = authHeader.split(' ')[1]
        JWT.verify(token, process.env.ACCESS_TOKEN_KEY,(err,data) => {
           if(err) throw err;
         if(data.user == req.params.id) {
          next()
         }else {
        responseHandler(res,400,false,'user not authorised',err)
         }
        })
        }
    } catch (error) {
        await errorHandler(error)
        responseHandler(res,500,false,'somthing went wrong',error)
        console.log(error);
    }
}