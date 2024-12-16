import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
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
app.use("/api", userRoutes);

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