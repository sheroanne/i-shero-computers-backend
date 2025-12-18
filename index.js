
import express from "express"
import mongoose from "mongoose"
import userRouter from "./Route/UserRouter.js";
import jwt from "jsonwebtoken"
import ProductRouter from "./Route/ProductRouter.js";
import cors from "cors"
import dotenv from "dotenv"
import orderRouter from "./Route/OrderRouter.js";
import ReviewRouter from "./Route/ReviewRouter.js";

dotenv.config()

const mongoURI = process.env.MONGO_URI

mongoose.connect(mongoURI).then(
    () => {
        console.log("connected to mongodb cluster")
    }
)

const app = express()

app.use(cors())

app.use(express.json());

app.use(
    (req, res, next) => {

        const authorizationHeader = req.header("Authorization");

        if (authorizationHeader != null) {
            const token = authorizationHeader.replace("Bearer ", "");

            console.log(token)

            jwt.verify(token, process.env.JWT_SECRET,
                (error, content) => {
                    if (content == null) {
                        console.log("Invalid token");
                        res.json({
                            message:"Invalid token"
                        });
                    }
                    else {
                        // console.log(content);
                        req.user = content;
                        next();
                    }
                }
            );
        }
        else{
            next()
        }
    }
)

app.use("/api/users", userRouter)
app.use("/api/products", ProductRouter)
app.use("/api/orders",orderRouter)
app.use("/api/reviews", ReviewRouter)


app.listen(5000,
    () => { console.log("server is running") }
)

// function abc(){
//     console.log("server is running")
// }




