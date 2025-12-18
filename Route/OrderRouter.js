import express from "express";
import { createOrder, getOrders, updateOrderStatus } from "../controller/OrderController.js";

const orderRouter = express.Router();

orderRouter.post("/", createOrder);
orderRouter.get("/", getOrders);
orderRouter.put("/:orderId", updateOrderStatus);


export default orderRouter;