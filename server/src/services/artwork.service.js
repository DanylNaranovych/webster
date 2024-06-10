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

    async read(artwork_id, user_id) {
        const found = await artwork.findUnique({ where: { id: artwork_id } });

        if(!found || found.authorId !== user_id)
            throw new ClientError("Artwork not found", 404);

        return found;
    },

    async update(artwork_id, user_id, data) {
        await this.read(artwork_id, user_id);

        await artwork.update({
            where: {
                id: artwork_id
            },
            data,
        });
    },

    async delete(artwork_id, user_id) {

        await this.read(artwork_id, user_id);

        console.log(artwork_id)

        await artwork.delete({ where: { id: artwork_id } });
    }
};

export default ArtworkService;