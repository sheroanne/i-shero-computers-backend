import express from "express"
import { createUser, loginUser } from "../controller/UserController.js"

const userRouter = express.Router()

userRouter.post("/login",loginUser)

userRouter.post("/", createUser)

export default userRouter;