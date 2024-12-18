
import express from "express";

import { createProject, getAllProject, getProjectById } from "../controllers/projectController.js";

const router = express.Router();

router.post("/create", createProject);
router.get("/getAllProject", getAllProject);
router.get('/findProject/:id', getProjectById)

export default router;