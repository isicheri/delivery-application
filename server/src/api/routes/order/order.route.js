import express from "express";
import { createOrder } from "../../../controller/order/order.controller";
const router = express.Router();


router.post('/create-order/:userId/:driverId',createOrder)



module.exports = router;