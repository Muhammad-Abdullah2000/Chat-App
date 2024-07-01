import express from 'express';
import { ConnectDB } from "./utils/features.js";
import dotenv from 'dotenv';
import { errorMiddleware } from './middlewares/error.js';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { v4 as uuid } from 'uuid';
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from './constants/events.js';
import { getSockets } from './lib/helper.js';
import { Message } from './models/message.js';


import userRoutes from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";



// import { createUser } from './seeders/user.js';

dotenv.config({
    path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "MuhammadAbdullah";
const userSocketIDs = new Map();

ConnectDB(mongoURI);





const app = express();
const server = createServer(app);
const io = new Server(server, {});


/// Using Middlewares Here:

app.use(express.json());
app.use(cookieParser());




app.use('/user', userRoutes);
app.use('/chat', chatRoute);
app.use('/admin', adminRoute);


app.get("/", (req, res) => {
    res.send("Hello Server");
});


io.use((socket, next) => {

});

io.on("connection", (socket) => {

    const user = {
        _id: "asdasd",
        name: "Abdullah"
    };

    userSocketIDs.set(user._id.toString(), socket.id);

    console.log(userSocketIDs);

    socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {

        const messageForRealTime = {
            content: message,
            _id: uuid(),
            sender: {
                _id: user._id,
                name: user.name
            },
            chat: chatId,
            createdAt: new Date().toISOString(),
        };

        const messageForDb = {
            content: message,
            sender: user._id,
            chat: chatId,
        };

        const membersSockets = getSockets(members);

        io.to(membersSockets).emit(NEW_MESSAGE, {
            chatId,
            message: messageForRealTime,
        });

        io.to(membersSockets).emit(NEW_MESSAGE_ALERT, { chatId });

        console.log("New data", messageForRealTime);

        try {
            await Message.create(messageForDb);
        } catch (error) {
            console.log(error);
        };

    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
        userSocketIDs.delete(user._id.toString());
    });

});

app.use(errorMiddleware);

server.listen(PORT, () => {
    console.log(`Server is runing on ${PORT} in ${envMode} mode`);
});


export {
    envMode,
    adminSecretKey,
    userSocketIDs
}