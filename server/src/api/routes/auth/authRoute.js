import express from "express";
import { getUsers } from "../../../controller/auth/authController";

const router = express.Router();

router.route("/user").get(getUsers);
module.exports = router;


