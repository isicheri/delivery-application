import express from "express";
import { cancelOrder, completeOrder, createOrder } from "../../../controller/order/order.controller";
const router = express.Router();


router.post('/create-order/:userId/:driverId',createOrder)
router.patch('/complete-order/:status/:order',completeOrder)
router.patch('/cancel-order/:status/:orderId',cancelOrder)



module.exports = router;