import dotenv from "dotenv";
dotenv.config()
import  express from "express";
import AuthRouter from "./api/routes/auth/authRoute"
const app = express();

app.get("/",(req,res) => {
    res.status(200).send("server is live");
})


app.use("/api/v1/auth",AuthRouter)

app.listen(process.env.PORT,() => {
    console.log("server is running port:" + process.env.PORT);
})