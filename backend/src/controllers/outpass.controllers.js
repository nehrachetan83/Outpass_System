import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Outpass from "../models/outpass.models.js";

const createOutpass = asyncHandler(async (req, res) => {
  const _username = req._username;
  const { day, date, startTime, endTime } = req.body;
  if (!day || !date || !startTime || !endTime || !_username) {
    throw new ApiError(400, "Fill all required fields");
  }
  console.log(req.user);
  console.log(req._username);
  const savedOutpass = await Outpass.create({
    username: _username,
    day: day,
    date: date,
    startTime: startTime,
    endTime: endTime,
    status: "pending",
    timestamp: Date.now(),
  });

  console.log(savedOutpass);
  if (!savedOutpass) {
    throw new ApiError(500, "Something went wrong with Server");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, "Your request is been send to the admin"));
});


// get all request of signed in user
const getpendingHistory_of_SpecificUser = asyncHandler(async (req, res) => {
  
  const aggregationPipeline = [
    {
      $match: {
        username: req._username,
      },
    },
    {
      $sort: {
        status: 1,
      },
    },
  ];
  const allOutpass = await Outpass.aggregate(aggregationPipeline);
  return res
    .status(201)
    .json(
      new ApiResponse(201, allOutpass, "All Outpass are fetched successfully")
    );
});

// for admin only
const getallRequest = asyncHandler(async (req, res) => {
  const checkAdmin = req.isAdmin;
  if (checkAdmin == "false") {
    throw new ApiError(401, "Unathorized request");
  }
  const aggregationPipeline = [
    {
      $sort: {
        status: 1,
      },
    },
  ];
  const allOutpass = await Outpass.aggregate(aggregationPipeline);
  return res
    .status(201)
    .json(
      new ApiResponse(201, allOutpass, "All Outpass are fetched successfully")
    );
});

export { createOutpass, getallRequest, getpendingHistory_of_SpecificUser };
