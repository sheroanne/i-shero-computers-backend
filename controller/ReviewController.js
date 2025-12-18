import Review from "../models/Review.js";
import { isAdmin } from "./UserController.js";

export async function createReview(req, res) {
    if (req.user == null) {
        res.status(401).json({
            message: "Unauthorized. Please login to submit a review.",
        });
        return;
    }

    try {
        const { productID, rating, comment } = req.body;
        const email = req.user.email;
        const firstName = req.user.firstName;
        const lastName = req.user.lastName;

        // Check if user already reviewed this product
        const existingReview = await Review.findOne({ productID, email });
        if (existingReview) {
            res.status(400).json({
                message: "You have already reviewed this product.",
            });
            return;
        }

        const review = new Review({
            productID,
            email,
            firstName,
            lastName,
            rating,
            comment,
        });

        await review.save();
        res.json({
            message: "Review submitted successfully",
            review: review,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating review",
            error: error.message,
        });
    }
}

export async function getReviewsByProduct(req, res) {
    try {
        const productID = req.params.productID;
        const reviews = await Review.find({ productID }).sort({ date: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching reviews",
            error: error.message,
        });
    }
}

export async function getAllReviews(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "Forbidden. Only admins can view all reviews.",
        });
        return;
    }

    try {
        const reviews = await Review.find().sort({ date: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching reviews",
            error: error.message,
        });
    }
}

export async function getReviewsByProductForAdmin(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "Forbidden. Only admins can access this endpoint.",
        });
        return;
    }

    try {
        const productID = req.params.productID;
        const reviews = await Review.find({ productID }).sort({ date: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching reviews",
            error: error.message,
        });
    }
}

