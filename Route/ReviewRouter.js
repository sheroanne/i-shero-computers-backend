import express from "express";
import { createReview, getAllReviews, getReviewsByProduct, getReviewsByProductForAdmin } from "../controller/ReviewController.js";

const ReviewRouter = express.Router();

ReviewRouter.post("/", createReview);
ReviewRouter.get("/", getAllReviews);
ReviewRouter.get("/product/:productID", getReviewsByProduct);
ReviewRouter.get("/admin/product/:productID", getReviewsByProductForAdmin);

export default ReviewRouter;

