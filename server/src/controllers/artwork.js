import { ClientError } from "../middleware/error.js";
import { saveFile } from '../utils/fileUpload.js';

import prisma from "../models/index.js";
import ArtworkService from "../services/artwork.service.js";

const artwork = prisma.artwork;

class artworkController {
     getArtworks = async(req, res) => {
         const authorId = req.user.id;

        const artworksArray = await ArtworkService.readAll(authorId);

        res.status(200).json({ artworksArray });
    }

    async createArtwork(req, res) {
        const artworkData = req.body;
        const user_id = req.user.id;

        const { id } = await ArtworkService.create({
            ...artworkData,
            authorId: user_id,
        });

        res.status(200).json({
            id,
        });
    }

    getArtwork = async(req, res) => {
        const artworkId = req.params.id;

        const artwork = await ArtworkService.read(artworkId, req.user.id);

        res.status(200).json({ ...artwork });
    }

    async updateArtwork(req, res) {
        const artwork_id = req.params.id;
        const user_id = req.user.id;
        const data = req.body;

        await ArtworkService.update(
            artwork_id,
            user_id,
            {
                ...data,
                content: JSON.parse(data.content),
            },
        );

        res.sendStatus(201);
    }

    async deleteArtwork(req, res) {
        const artwork_id = req.params.id;
         const user_id = req.user.id;

         await ArtworkService.delete(
             artwork_id,
             user_id
         );

        res.sendStatus(204);
    }

    async uploadArtworkObject (req, res) {
        const artwork_id = req.params.id;
        const user_id = req.user.id;
        const file = req.files;

        await ArtworkService.uploadArtworkObject(file, user_id, artwork_id);

        res.sendStatus(200);
    }

    async uploadArtworkPhoto (req, res) {
        const artwork_id = req.params.id;
        const user_id = req.user.id;
        const file = req.files;

        await ArtworkService.uploadArtworkPhoto(file, user_id, artwork_id);

        res.sendStatus(200);
    }
}

const controller = new artworkController();
export default controller;
