import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Username area is required"],
            lowercase: true,
            validate: [
                validator.isAlphanumeric,
                "Only alphanumeric characters",
            ],
        },
        email: {
            type: String,
            required: [true, "Email is area is required"],
            unique: true,
            validate: [validator.isEmail, "Valid email is required"],
        },
        password: {
            type: String,
            required: [true, "Password area is required"],
            minLength: [4, "At least 4 characters"],
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", function (next) {
    const user = this;
    console.log("user_pass", user.password);
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash;
        console.log("user_pass2", user.password);
        next();
    });
});

const User = mongoose.model("User", userSchema);

export default User;
