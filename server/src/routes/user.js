import express from "express";
import controller from "../controllers/user.js";
import TokenService from "../services/token.service.js";
import { boundary } from "../middleware/error.js";
import passport from "passport";

const router = express.Router();

// router.get('/', boundary(controller.getUsers));
// router.get('/:id', boundary(controller.getUser));
//
// // router.use(passport.authenticate("jwt", { session: false });
//
// router.put('/:id', boundary(controller.updateUser));
// // router.delete('/:id', boundary(controller.deleteUser));
// router.post('/:id/avatar', boundary(controller.updateUserPhoto));
// router.delete('/:id/avatar', boundary(controller.deleteUserPhoto));

export default router;