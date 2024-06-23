import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // getting details form frontend
  const { username, email, fullName, password } = req.body;

  // validation
  if (!fullName) throw new ApiError(400, "fullName is required");
  if (!password) throw new ApiError(400, "password is required");
  if (!email) throw new ApiError(400, "email is required");
  if (!username) throw new ApiError(400, "username is required");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Invalid email format");
  }

  // if user already exist
  const existedUser = await User.findOne({
    $or: [{ email: email }, { username: username }],
  });
  if (existedUser) throw new ApiError(400, "User already exists");

  const avatarLocalPath = req.files?.avatar[0]?.path;
  // avatar is present or not
  if (!avatarLocalPath) throw new ApiError(400, "Avatar is required");

  // uplaod to cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) throw new ApiError(400, "Avatar not uploaded on cloudinary");

  // create user object
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    email,
    username: username.toLowerCase(),
    password,
    isAdmin: false,
  });
  console.log(user);
  // remove password and refresh token field
  const checkifUsercreated = await User.findById(user.id).select(
    "-password -refreshToken"
  );
  // check for user creation
  if (!checkifUsercreated) {
    throw new ApiError(404, "Error while registering the user ");
  }

  // return response
  return res
    .status(201)
    .json(
      new ApiResponse(201, checkifUsercreated, "User created successfully")
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  console.log(username);
  console.log(email);
  if (!email && !username) {
    throw new ApiError(400, "email or username is required");
  }
  const user = await User.findOne({
    $or: [{ email: email }, { username: username }],
  });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  console.log(password);
  const ispasswordvalid = await user.isPasswordCorrect(password);
  if (!ispasswordvalid) {
    throw new ApiError(400, "Invalid password");
  }
 
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();
  if (!accessToken || !refreshToken) {
    throw new ApiError(
      500,
      "Something went wrong while generating Refresh and access token"
    );
  }
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const loginUser = await User.findById(user._id).select(
    "-refreshToken -password"
  );

  const options = {
    httpOnly: true,
    // secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, loginUser, "User logged in successfully"));
});

const loggOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.body._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    { new: true }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  res.clearCookie("accessToken", options);
  res.clearCookie("refreshToken", options);
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export { registerUser, loginUser, loggOutUser };
