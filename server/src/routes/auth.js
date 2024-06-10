import express from "express";
import controller from "../controllers/auth.js";
import { boundary } from "../middleware/error.js";

const router = express.Router();

router.post('/register', boundary(controller.signup));
router.post('/login',  boundary(controller.login));
router.post('/password-reset/:token',  boundary(controller.set_new_password));
router.post('/password-reset',  boundary(controller.password_reset));
router.post('/confirm-account/:token', boundary(controller.confirmEmail));
router.post('/logout',  boundary(controller.logout));

export default router;