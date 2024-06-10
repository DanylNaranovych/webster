import express from "express";
import controller from "../controllers/artwork.js";
import TokenService from "../services/token.service.js";
import { boundary } from "../middleware/error.js";

const router = express.Router();

// router.get("/", boundary(controller.getEvents));
router.get('/:id', boundary(controller.getArtwork));
//
router.use(TokenService.authCheck);
//
router.post("/", boundary(controller.createArtwork));
// router.put('/:id', checkUserEventPermissions, boundary(controller.updateEvent));
// router.delete('/:id', checkUserEventPermissions, boundary(controller.deleteEvent));

export default router;
