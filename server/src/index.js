import dotenv from "dotenv";
dotenv.config()
import  express from "express"
import cookieparser from 'cookie-parser'
import AuthRouter from "./api/routes/auth/authRoute"
import OrderRouter from "./api/routes/order/order.route"

import { ErrorHandler,AppError } from "./middleware/ErrorHandler";
const app = express();

app.get("/",(req,res) => {
    res.status(200).send("server is live");
})

app.use(express.json())
app.use(cookieparser())
app.use("/api/v1/auth",AuthRouter)
app.use("/api/v1/order",OrderRouter)

app.all('*',(req,res,next) => {
    // res.status(400).json({
    //     status: 'failed',
    //     message: 'no routes like that'
    // }
    // const error = new Error(`no route found like ${req.originalUrl} on this server`);
    // error.status = "failed";
    // error.statusCode = 404
    next(new AppError(`no route found like ${req.originalUrl} on this server`,404))
})

app.listen(process.env.PORT,() => {
    console.log("server is running port:" + process.env.PORT);
})

app.use(ErrorHandler)