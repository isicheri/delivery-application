import express from "express";
import { createUser, getUsers } from "../../../controller/auth/authController";
import { validationHandler } from "../../../services/validation";
import { signupValidator } from "../../../middleware/validator";

const router = express.Router();

router.post('/create',validationHandler(signupValidator),createUser)
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