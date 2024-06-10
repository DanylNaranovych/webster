import express from "express";
import controller from "../controllers/artwork.js";
import TokenService from "../services/token.service.js";
import { boundary } from "../middleware/error.js";

const router = express.Router();

// router.get("/", boundary(controller.getEvents));
//
router.use(TokenService.authCheck);

router.get("/", boundary(controller.getArtworks));
router.post("/", boundary(controller.createArtwork));
router.get('/:id', boundary(controller.getArtwork));
router.put('/:id', boundary(controller.updateArtwork));
router.delete('/:id', boundary(controller.deleteArtwork));

export default router;
