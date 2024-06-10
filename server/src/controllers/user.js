import usersTable from '../models/User.js';
import { ClientError } from "../middleware/error.js";
import { saveFile } from '../utils/fileUpload.js';
import { hashPassword } from '../utils/hash.js';
import TokenService from '../services/token.service.js';
// import eventsTable from '../models/Artwork.js';

class usersController {

    getUsers = async(req, res) => {
        const { eventId, comments } = req.query;

        let usersArray;
        if(eventId) {
            if(comments)
                usersArray = await usersTable.getUsersEventComments(eventId);
            else
                usersArray = await usersTable.getEventGuests(eventId);
        } else
            usersArray = await usersTable.getAll();

        res.status(200).json({
            usersArray,
        });
    }

    getUser = async(req, res) => {
        const userId =  Number(req.params.id);

        const userData = await usersTable.read(userId);

        if (!userData)
            throw new ClientError('This user does not exist', 404);

        res.status(200).json({ userData });
    }

    updateUser = async(req, res) => {
        const userId = Number(req.params.id);
        const { login, password, email, full_name  } = req.body;

        if(login) {
            if (await usersTable.checkFor("login", login))
                throw new ClientError("User exists", 409);
            await usersTable.update(userId, "login", login);

            if(req.user.userId === userId) {
                const token = await TokenService.generate({
                    userId: req.user.userId,
                    login,
                });

                res.clearCookie("token").cookie("token", token);
            }
        }

        if(email) {
            if (await usersTable.checkFor("email", email))
                throw new ClientError("Email in use", 409);
            await usersTable.update(userId, "email", email);
        }

        if(full_name)
            await usersTable.update(userId, "full_name", full_name);

        if(password) {
            const hash = await hashPassword(password);
            await usersTable.update(userId, "password", hash);
        }

        res.sendStatus(201);
    }

    updateUserPhoto = async(req, res) => {
        const userId = Number(req.params.id);
        const file = req.files;

        if (!file)
            throw new ClientError('Please provide a valid file', 400);

        const fileName = await saveFile(file);
        await usersTable.update(userId, "picture", fileName);

        res.sendStatus(200);
    }

    deleteUserPhoto = async(req, res) => {
        const userId = Number(req.params.id);

        await usersTable.update(userId, "picture", "default_avatar.png");

        res.sendStatus(204);
    }

    getAllTicketEvents = async(req, res) => {
        const user_id = req.user.userId;

        const eventsArray = await eventsTable.getAllUserEvents(user_id);

        res.status(200).json({ eventsArray });
    }
}

const controller = new usersController();
export default controller;
