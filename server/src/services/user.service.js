import {ClientError} from "../middleware/error.js";
import prisma from "../models/index.js"
import {comparePasswords, hashPassword} from "../utils/hash.js";
import TokenService from "./token.service.js";
import {sendMail} from "../utils/mail.js";
import {EMAIL_TEMPLATES} from "../consts/email_templates.js";
import nodemailer from "nodemailer";
import {NODEMAILER_TRANSPORTER} from "../consts/nodemailer.js";

const user = prisma.user;

const UserService = {

    async SignUp(userData) {
        const { login, email, password, full_name } = userData;

        await user.checkFor("login", login);
        await user.checkFor("email", email);

        const hash = await hashPassword(password);
        const { id } = await user.create({
            data: {
                login,
                full_name,
                email,
                hash
            },
        });

        const token = await TokenService.generate({ id });

        await sendMail(
            email,
            EMAIL_TEMPLATES.USER_SIGNUP.subject,
            EMAIL_TEMPLATES.USER_SIGNUP.html(token)
        );
    },

    async SignIn(userData) {
        const { login, password } = userData;

        const found = await user.findFirst({ where: { login } });

        if (!found || !await comparePasswords(password, found.hash))
            throw new ClientError("Invalid login or password", 401);

        if(!found.isConfirmed)
            throw new ClientError("Confirm your email first", 403);


        const token = await TokenService.generate({
            userId: found.id,
        });

        delete found.hash;
        delete found.isConfirmed;

        return { found, token };
    },

    async ConfirmEmail(token) {
        let id;

        await TokenService.getData(token).then((value) => (id = value.id));

        await user.update({ where: { id } });
    },

    async PasswordResetMail(email) {
        const token = await TokenService.generate({ email });

        await sendMail(
            email,
            EMAIL_TEMPLATES.USER_PASSWORD_RESET.subject,
            EMAIL_TEMPLATES.USER_PASSWORD_RESET.html(token),
        );
    },

    async PasswordReset(token, password) {
        let id;

        await TokenService.getData(token).then((value) => (id = value.id));
        const hash = await hashPassword(password);

        await user.update({
            where: { id },
            data: { hash },
        });
    },
}

export default UserService;