import { PrismaClient } from "@prisma/client";
import {ClientError} from "../middleware/error.js";

const prisma = new PrismaClient();

export default {
    user: {
        async checkFor(key, value) {
            const exists = await prisma.user.findFirst({
                where: {
                    [key]: value,
                },
            });
            if (exists) {
                throw new ClientError(`The user with this ${key} already exists.`, 400);
            }
        },
    },
};