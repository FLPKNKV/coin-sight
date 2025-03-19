import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please provide a first name"],
    },
    lastName: {
        type: String,
        required: [true, "Please provide a last name"],
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
