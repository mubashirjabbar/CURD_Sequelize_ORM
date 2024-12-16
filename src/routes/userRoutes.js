
import express from "express";

import { login, signUpUser } from "../controllers/userController.js";

const router = express.Router();



router.post("/user/signup", signUpUser);
router.post("/user/login", login);


export default router;