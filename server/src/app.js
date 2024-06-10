import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
import {errorMiddleware} from "./middleware/error.js";
import Logger from './loaders/logger.js';
// import { admin, adminRouter } from './admin/app.js';

const app = express();

// app.use(admin.options.rootPath, adminRouter);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({}));
app.use(cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
    methods: "GET, POST, PUT, PATCH, DELETE",
    allowedHeaders: "Content-Type, Authorization, Set-Cookie",
}));

app.use("/api", router);

app.use(errorMiddleware);

app.use(express.static(process.env.FILES_DIR));

app.listen(process.env.SERVER_PORT, () => {
    Logger.info(`Server listening on port: ${process.env.SERVER_PORT}`);
}).on('error', (err) => Logger.error(err.message));
