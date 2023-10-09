import { validationResult } from "express-validator";
import { responseHandler } from "./responseHandler";
import Model from '../database/models'
import { decryptData } from "../helper/bcrypt";


export const existingEmail = async(email) => {
    const check_existing_email = await Model.User.findOne({ where: { email } });
    if(check_existing_email){
        throw new Error("Email already exist");
    }
    return true;
}

export const existingPhoneNumber = async(phone) => {
    const check_existing_phone_number = await Model.User.findOne({ where: { phone }});
    if(check_existing_phone_number){
        throw new Error("Phone Number already exist");
    }
    return true;
}

export const passwordValidation = async(body) => {
    const { password, confirmPassword } = body;
    if(password !== confirmPassword){
        throw new Error("Passwors do not match");
    }
    return true;
}

export const checkAllowedFields = (payload, fields) => {
    payload = Array.isArray(payload) ? payload : [payload];

    payload.forEach((item) => {
        const allowed = Object.keys(item).every(field => fields.includes(field));
        fields = typeof fields === 'string' ? fields : fields.join(', ');

        if(!allowed){
            throw new Error(`Wrong fields passed. Allowed fields: ${ fields }`);
        }

    });
    return true;
}



/**
 * this validations is for the login
 * @param {*} email 
 * @returns
 */
export const checkEmailExist = async(email) => {
    const check_existing_email = await Model.User.findOne({ where: { email } });
    if(!check_existing_email){
        throw new Error("Email does not exist");
    }
    return true;
}

export const checkPasswordCorrect = async(body) => {
    const {email,password} = body;
    const user = await Model.User.findOne({where:{email:email}});
    const comparedPassword = await decryptData(password,user.password)
    if (!comparedPassword) {
        throw new Error("Password is incorrect");
    }
    return true;
}




/**
 * this is the main validation handler to expose the validator the route
 * @param {*} values 
 * @returns 
 */
export const validationHandler = (values = []) => {
    return async (req, res, next) => {
        await Promise.all(values.map((value) => value.run(req)));

        const errors = validationResult(req);
        if(errors.isEmpty()){
            return next();
        }
        
        const _errors = errors.array();
        let message = "Invalid Parameters:";

        _errors.forEach((v) => {
            message += `${ v.param }`;
        });
        responseHandler(res, 422, false, {errors: errors.array() });
    }
}