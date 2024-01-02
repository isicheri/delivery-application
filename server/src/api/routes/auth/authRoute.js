import express from "express";
import { createDriver, createUser, getUsers, loginUser, requestOtp, userDeleteAccount, verifyDriverOtp, verifyOtp } from "../../../controller/auth/authController";
import { validationHandler } from "../../../services/validation";
import { driverSignupValidator, loginValidator, otpValidator, signupValidator,driverOtpValidator } from "../../../middleware/validator";
import { verifyToken } from "../../../controller/validators/authValidator";
import { generateNewAccessToken } from "../../../helper/generateNewAcessToken";

const router = express.Router();

router.post('/create',validationHandler(signupValidator),createUser)
router.post('/verify-otp/:id',validationHandler(otpValidator),verifyOtp)
router.get('/request-new-otp/:id',requestOtp)
router.post('/login-user',validationHandler(loginValidator),loginUser)
router.delete('/delete-account/:id',verifyToken,userDeleteAccount)
router.post('/request-new-token/:id',generateNewAccessToken)

/**
 * driver authentication route lol
 */

router.post('/create-driver-account',validationHandler(driverSignupValidator),createDriver)
router.post('/verify-driver-otp/:id',validationHandler(driverOtpValidator),verifyDriverOtp)


router.route("/").get(getUsers);
module.exports = router;


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