import mongoose from "mongoose"

const userschema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "customer"
        },
        isblocked: {
            type: Boolean,
            default: false,
        },
        isemailverified: {
            type: Boolean,
            default: false
        },
        Image: {
            type: String,
            required: true,
            default: "default.jpg"
        }

        // invalidTries: {
        //     type: Number,
        //     default: 0
        // }

    }
)

const User = mongoose.model("User", userschema)

export default User;

