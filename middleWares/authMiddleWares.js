import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const checkUser = async (req, res, next) => {
    const token = req.cookies.jsonwebtoken;
    if (token) {
        jwt.verify(
            token,
            process.env.JWT_SECRET,
            async (error, decodedToken) => {
                if (error) {
                    console.log(error.message);
                    res.locals.user = null;
                    next();
                } else {
                    const user = await User.findById(decodedToken.userId);
                    res.locals.user = user;
                    next();
                }
            }
        );
    } else {
        res.locals.user = null;
        next();
    }
};

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.cookies.jsonwebtoken;

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (error) => {
                if (error) {
                    console.log(error.message);
                    res.redirect("/login");
                } else {
                    next();
                }
            });
        } else {
            res.redirect("/login");
        }
    } catch (error) {
        res.status(401).json({
            succeded: false,
            error: "Not auth",
        });
    }
};
export { authenticateToken, checkUser };
