import JWT from 'jsonwebtoken'
import { responseHandler } from '../services/responseHandler';
import { generateAccessToken } from './generateToken';

export const generateNewAccessToken = (req,res) => {
    if(req.cookies?.jwt) {
        const refreshToken = req.cookies.jwt; 
       JWT.verify(refreshToken,process.env.REFRESH_TOKEN_KEY,(err,data) => {
     if(err) {
        responseHandler(res,400,false,'something went wrong!',err)
     }else {
     const accessToken = generateAccessToken({id:req.params.id})
     responseHandler(res,200,true,'token has been renewed',{accessToken: accessToken})
     }
       })
    }else {
        responseHandler(res,400,false,'token does not exist',null)
    }
}