import { body } from "express-validator";
import {existingEmail,passwordValidation,existingPhoneNumber,checkAllowedFields,checkEmailExist,checkPasswordCorrect, existingDriverPhoneNumber,existingDriverEmail} from "../services/validation"

export const signupValidator = [
    body('email')
        .exists()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid Email")
        .custom(existingEmail)
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage("Password is required")
        .isLength({min: 8})
        .withMessage("Password must be more than 8 characters"),
    body('confirmPassword')
        .notEmpty()
        .withMessage("Confirm Password is required")
        .isLength({min: 8})
        .withMessage("Confirm Password must be more than 8 characters"),
    body('firstName')
        .trim()
        .exists()
        .withMessage("First Name is required")
        .notEmpty()
        .withMessage("Please provide your First Name"),
    body('lastName')
        .trim()
        .exists()
        .withMessage("Last Name is required")
        .notEmpty()
        .withMessage("Last Name cannot be empty"),
    body('phone')
        .trim()
        .exists()
        .withMessage("Phone Number is required")
        .notEmpty()
        .withMessage("Please provide your Phone Number")
        .isLength({min: 11, max: 11})
        .withMessage("Phone Number must be 11 digits")
        .custom(existingPhoneNumber),
    body()
        .custom(passwordValidation)
        .custom(body => checkAllowedFields(body, ['email', 'password', 
        'firstName', 'lastName', 'phone', 'confirmPassword']))
]

export const otpValidator = [
    body('otp')
    .exists()
    .withMessage('otp is required')
    .isLength({max: 6})
    .withMessage('otp must not be more than 6 characters'),
    body()
    .custom(body => checkAllowedFields(body,['otp']))
]

export const loginValidator =  [
    body('email')
        .exists()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid Email")
        .custom(checkEmailExist)
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage("Password is required")
        .isLength({min: 8})
        .withMessage("Password must be more than 8 characters"),
    body()
    .custom(checkPasswordCorrect)
    .custom(body => checkAllowedFields(body, ['email', 'password']))
];

export const driverSignupValidator = [
    body('phone')
    .trim()
    .exists()
    .withMessage("Phone Number is required")
    .notEmpty()
    .withMessage("Please provide your Phone Number")
    .withMessage("Phone Number must be 11 digits")
    .custom(existingDriverPhoneNumber),
    body('email')
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid Email")
    .custom(existingDriverEmail)
    .normalizeEmail(),
    body()
    .custom(body => checkAllowedFields(body,['firstName','lastName','phone','email','vehicleplateNumber','vehiclecType']))
]

export const driverOtpValidator = [
    body('otp')
    .trim()
    .exists()
    .withMessage('otp is required')
    .isLength({min: 6,max: 6})
    .withMessage('number cannot be more or less than 6 characters'),
    body()
    .custom(body => checkAllowedFields(body,['otp']))
]