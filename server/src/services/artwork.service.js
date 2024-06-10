import prisma from "../models/index.js";
import {ClientError} from "../middleware/error.js";

const artwork = prisma.artwork;

const ArtworkService = {
    async create(data) {

        try {
            JSON.parse(data.content);
        } catch (err) {
            throw new ClientError("Invalid JSON file", 400);
        }

        return await artwork.create({ data });
    },

    async read(id) {
        const found = await artwork.findUnique({ where: { id } });

        if(!found)
            throw new ClientError("Artwork not found", 404);

        return found;
    }
};

export default ArtworkService;