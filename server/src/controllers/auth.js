import jsonwebtoken from "jsonwebtoken";
import nodemailer from "nodemailer";
import TokenService from "../services/token.service.js";
import { hashPassword } from "../utils/hash.js";
import { NODEMAILER_TRANSPORTER } from "../consts/nodemailer.js";
import UserService from "../services/user.service.js";

class authController {

    async login(req, res) {
        if (req.cookies.token) { // relocate to middleware with Joi things
            jsonwebtoken.verify(req.cookies.token, process.env.COOKIE_SECRET, (err) => {
                if (err) {
                    res.clearCookie("token").sendStatus(401);
                }

            });
            res.sendStatus(200);
            return;
        }

        const userData = req.body;

        const { found, token } = await UserService.SignIn(userData);

        res.cookie("token", token).json({
            ...found,
            token,
        });
    }

    signup = async(req, res) => {
        const user = req.body;

        await UserService.SignUp(user);

        res.sendStatus(200);
    }

    confirmEmail = async(req, res) => {
        const token = req.params.token;

        await UserService.ConfirmEmail(token);

        res.sendStatus(200);
    }

    logout = async(req, res) => {
        res.clearCookie("token").sendStatus(204);
    }

    password_reset = async(req, res) => {
        const { email } = req.body;

        await UserService.PasswordResetMail(email);

        res.sendStatus(200);
    }

    set_new_password = async(req, res) => {
        const password = req.body.password;
        const token = req.params.token;

        await UserService.PasswordReset(
            token,
            password
        );

        res.sendStatus(200);
    }
}

const controller = new authController();
export default controller;
