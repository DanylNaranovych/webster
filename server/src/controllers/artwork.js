import { ClientError } from "../middleware/error.js";
import { saveFile } from '../utils/fileUpload.js';

import prisma from "../models/index.js";
import ArtworkService from "../services/artwork.service.js";

const artwork = prisma.artwork;

class artworkController {
     getEvents = async(req, res) => {
        const companyId = req.query.companyId;

        let eventsArray;
        if(companyId)
            eventsArray = await artwork.getAllCompanyEvents(companyId);
        else
            eventsArray = await artwork.getAll();

        res.status(200).json({ eventsArray });
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

        res.status(200).json({ ...artwork, content: JSON.parse(artwork.content) });
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

    updateEventPhoto = async(req, res) => {
        const eventId = Number(req.params.id);
        const file = req.files;

        if (!file)
            throw new ClientError('Please provide a valid file', 400);

        const fileName = await saveFile(file);
        await artwork.update(eventId, "picture", fileName);

        res.sendStatus(200);
    }

    deleteEventPhoto = async(req, res) =>  {
        const eventId = Number(req.params.id);

        await artwork.update(eventId, "picture", "default_avatar.png");

        res.sendStatus(204);
    }
}

const controller = new artworkController();
export default controller;
