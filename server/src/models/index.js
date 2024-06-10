import { PrismaClient } from "@prisma/client";
import userExtensions from './user.js';

const prisma = new PrismaClient().$extends({
    model: {
        ...userExtensions,
        // ...artworkExtensions,
    },
});

export default prisma;