import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
      
    console.log(token)
    if (!token) {
      throw new ApiError(401, "Unathorized request ");
    }
    const decodedtoken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedtoken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      ApiError(401, "User not found here");
    }
    req.user = user;
    req._username = user.username;
    req.isAdmin = user.isAdmin;
    console.log(req.user);
    console.log(req._username);
    
    next();
  } catch (error) {
    throw new ApiError(500, "Internal Server Error");
  }
});
