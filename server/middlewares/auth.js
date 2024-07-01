import { ErrorHandler } from '../utils/utility.js';
import jwt from 'jsonwebtoken';
import { adminSecretKey } from "../app.js";

const isAuthenticated = (req, res, next) => {

    const token = req.cookies["Chat-token"];

    if (!token) return next(new ErrorHandler("Please Login  to access this route", 401));

    const decodeData = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decodeData);

    req.user = decodeData._id;

    next();
};

const adminOnly = (req, res, next) => {

    const token = req.cookies["Chat-admin-token"];

    if (!token) return next(new ErrorHandler("Only admin can access", 401));

    const secretKey = jwt.verify(token, process.env.JWT_SECRET);

    const isMatched = secretKey === adminSecretKey;

    if (!isMatched) return next(new ErrorHandler("Only admin can access", 401));

    console.log(secretKey);

    next();
};

export { isAuthenticated, adminOnly };
