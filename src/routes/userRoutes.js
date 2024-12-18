
import express from "express";

import { login, signUpUser } from "../controllers/userController.js";

const router = express.Router();



router.post("/signup", signUpUser);
router.post("/login", login);


export default router;