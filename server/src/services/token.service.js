import jsonwebtoken from "jsonwebtoken";
import { ClientError } from "../middleware/error.js";
import { COOKIE_OPTIONS } from '../consts/default.js';
import prisma from "../models/index.js";

const user = prisma.user;

export default class TokenService {

    static async generate(payload) {
        return jsonwebtoken.sign(payload, process.env.COOKIE_SECRET, COOKIE_OPTIONS);
    }

    static async authCheck(req, res, next) {
        try {
            const token = req.cookies.token;
            if (!token) {
                new ClientError('The access token is invalid or has expired', 401);
            }

            const decoded = await new Promise((resolve, reject) => {
                jsonwebtoken.verify(token, process.env.COOKIE_SECRET, (err, decoded) => {
                    if (err) {
                        res.clearCookie("token");
                        return reject(new ClientError('The access token is invalid or has expired', 401));
                    }
                    resolve(decoded);
                });
            });

            req.user = await user.findUnique({ where: { id: decoded.userId } });

            next();
        } catch (err) {
            return next(err);
        }
    }

    static async getData(token) {
        let data;
        if (!token)
            return false;
        jsonwebtoken.verify(token, process.env.COOKIE_SECRET, (err, decoded) => {
            if (err)
                throw new ClientError('The access token is invalid or has expired.', 401);

            data = decoded;
        });
        return data;
    }
}
