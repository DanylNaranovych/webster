import Logger from "../loaders/logger.js";

export class ClientError extends Error {
    status

    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

const errorMiddleware = (error, req, res, next) => {
    Logger.error(error);
    res.status((error).status || 500).json({
        message: error.message || 'A server-side error occurred.',
    });
};

const boundary = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (err) {
        next(err);
    }
};


export {errorMiddleware, boundary};