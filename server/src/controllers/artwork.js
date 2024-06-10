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

    getArtwork = async(req, res) => {
        const artworkId = req.params.id;

        const artwork = await ArtworkService.read(artworkId);

        res.status(200).json({ ...artwork, content: JSON.parse(artwork.content) });
    }

    createArtwork = async(req, res) =>  {
        const artworkData = req.body;

        const { id } = await ArtworkService.create({
            ...artworkData,
            authorId: req.user.id,
        });

        res.status(200).json({
            id,
        });

    }

    updateEvent = async(req, res) => {
        const eventId = Number(req.params.id);
        const { name, description, date, price, tickets_available, latitude, longitude, company_id, format_id, theme_id } = req.body;

        if (name) {
            if (await artwork.checkFor("name", name))
                throw new ClientError("Event exists", 409);
            await artwork.update(eventId, "name", name);
        }
        if (description) await artwork.update(eventId, "description", description);
        if (date) await artwork.update(eventId, "date", date);
        if (price) await artwork.update(eventId, "price", price);
        if (tickets_available) await artwork.update(eventId, "tickets_available", tickets_available);
        if (latitude) await artwork.update(eventId, "latitude", latitude);
        if (longitude) await artwork.update(eventId, "longitude", longitude);
        if (company_id) {
            if(!await companiesTable.checkFor("id", company_id))
                throw new ClientError("Unknown company", 404);

            await artwork.update(eventId, "company_id", company_id);
        }
        if (format_id) {
            if (!await formatsTable.checkFor("id", format_id))
                throw new ClientError("Unknown format", 409);
            await artwork.update(eventId, "format_id", format_id);
        }
        if (theme_id) {
            if (!await themesTable.checkFor("id", theme_id))
                throw new ClientError("Unknown theme", 409);
            await artwork.update(eventId, "theme_id", theme_id);
        }

        res.sendStatus(201);
    }

    deleteEvent = async(req, res) => {
        const eventId = Number(req.params.id);

        await artwork.delete(eventId);
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
