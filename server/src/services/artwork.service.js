import prisma from "../models/index.js";
import {ClientError} from "../middleware/error.js";
import {deleteFile, saveFile} from "../utils/fileUpload.js";

const artwork = prisma.artwork;

const ArtworkService = {

    async create(data) {

        try {
            data.content = JSON.parse(data.content);
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

    async readAll(authorId) {
        return await artwork.findMany({
            where: {
                authorId,
            },
            select: {
                id: true,
                name: true,
                description: true,
                authorId: true,
                createdAt: true,
            },
        });
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

        const found = await this.read(artwork_id, user_id);

        await deleteFile( found.content.image.imageSrc);

        await artwork.delete({ where: { id: artwork_id } });
    },

    async uploadArtworkObject(file, user_id, artwork_id) {
        const metadata = await this.read(artwork_id, user_id);

        if (!file)
            throw new ClientError('Please provide a valid file', 400);

        const fileExtension = file.photo.name.split('.').pop();
        const file_name = artwork_id + '_' + Date.now() + '.' + fileExtension;
        const path = process.env.OBJECTS_DIR + file_name;

        await saveFile(path, file);

        await deleteFile(metadata.content.image.imageSrc);

        metadata.content.image['imageSrc'] = path;

        await this.update(artwork_id, user_id, {
            content: metadata.content,
        });
    },
};

export default ArtworkService;