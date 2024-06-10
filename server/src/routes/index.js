import express from "express";
import auth from "./auth.js";
import artwork from "./artwork.js";
import user from "./user.js";

const router = express.Router();

router.use('/auth', auth);
router.use('/artwork', artwork);
router.use('/user', user);

export default router;
