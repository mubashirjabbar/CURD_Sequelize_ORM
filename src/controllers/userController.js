import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

const generateToken = (payload) => {
  // first thing is to pass the id and second thing is to pass the string random string 
  return jwt.sign(payload, process.env.JWT_TOKEN_STRING, {
    expiresIn: process.env.JWT_EXPIRE_INE
  })
}

export const signUpUser = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, userType, password, confirmPassword, phoneNumber } = req.body;
  try {
    // check the user must be the user and guest
    if ((!['user', 'guest'].includes(userType))) {
      return handleResponse(res, 400, "Invalid user type. Choose between 'user' and 'guest'");
    }
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      userType,
      password,
      phoneNumber,
      confirmPassword,
    })
    if (!newUser) {
      return next(new AppError('Failed to create the user', 400));
    }
    // there are many ways to not send the password in the response
    const result = newUser.toJSON();
    delete result.password;

    result.token = generateToken({ id: result.id })

    return handleResponse(res, 201, "User created successfully", result);

  } catch (err) {
    next(err);
  }
});


export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  try {

    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }

    // find the user in the database by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return next(new AppError('Incorrect email or password', 401));
    }

    // compare the password from the request with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return handleResponse(res, 401, "Invalid email or password");
    }

    // there are many ways to not send the password in the response
    const result = user.toJSON();
    delete result.password;

    result.token = generateToken({ id: result.id })

    return handleResponse(res, 201, "User logged in successfully", result);

  } catch (error) {
    next(error);
  }
})