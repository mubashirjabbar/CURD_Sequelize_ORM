import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import sequelize from "./config/database.js";
import globalErrorHandler from "./controllers/errorController.js";
import catchAsync from "./utils/catchAsync.js";
import AppError from "./utils/appError.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/project", projectRoutes);

// sequelize
app.use(
    '*',
    catchAsync(async (req, res, next) => {
        throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
    })
);

app.use(globalErrorHandler);

app.listen(port, () => {
    console.log(`Server is running on http:localhost:${port}`);
});