import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

const cookieOptions = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: true,
}

const ConnectDB = (uri) => {
    mongoose.connect(uri, { dbName: "ChatApp" }).then((data) => console.log(`DB connected Successfully to ${data.connection.host}`)).catch((err) => { throw err });
};

const sendToken = (res, user, code, message) => {

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    return res.status(code).cookie("Chat-token", token, cookieOptions).json({
        success: true,
        message,
    });

};


const emitEvent = (req, event, users, data) => {
    console.log("Emitting Event", event);
};

const deleteFilesFromCloudinary = async (public_ids) => {
    //// Delete Files from cloudinary
};


export {
    ConnectDB,
    sendToken,
    cookieOptions,
    emitEvent,
    deleteFilesFromCloudinary
}