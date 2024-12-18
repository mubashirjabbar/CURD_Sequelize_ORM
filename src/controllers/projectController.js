import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import Project from "../models/projectModel.js";
import User from "../models/userModel.js";

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    });
};


export const createProject = catchAsync(async (req, res, next) => {

    const { title, isFeatured, productImage, price, shortDescription, description, productUrl, category, tags, } = req.body;
    // const userId = req.user.id;
    try {
        console.log("enter");

        const newProject = await Project.create({
            title,
            isFeatured,
            productImage,
            price,
            shortDescription,
            description,
            productUrl,
            category,
            tags,
            createdBy: 1,
        })
        if (!newProject) {
            return next(new AppError('Failed to create the Project', 400));
        }

        return handleResponse(res, 201, "Project created successfully", newProject);

    } catch (err) {
        console.log("err", err);

        next(err);
    }
});

export const getAllProject = catchAsync(async (req, res, next) => {
    // const userId = req.user.id;
    const result = await Project.findAll({
        order: [['createdAt', 'DESC']],
        include: [{ model: User, attributes: ['id', 'firstName', 'lastName'] }],
    });

    return handleResponse(res, 200, "Project created successfully", result);
});

export const getProjectById = catchAsync(async (req, res, next) => {
    const projectId = req.params.id;
    const result = await Project.findByPk(projectId, { include: [{ model: User, attributes: ['id', 'firstName', 'lastName'] }] });
    if (!result) {
        return next(new AppError('Invalid project id', 400));
    }
    return handleResponse(res, 200, "Succuss", result);

});


