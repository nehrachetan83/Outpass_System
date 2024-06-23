import mongoose, { Schema } from "mongoose";

const outpassSchema = new Schema(
  {
    username: { type: String },
    status: { type: String, default: "pending" },
    // Day of the outpass request
    day: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    // Date of the outpass request
    date: {
      type: Date,
      required: true,
    },
    // Start time of the outpass
    startTime: {
      type: String,
      required: true,
      trim: true,
    },
    // End time of the outpass
    endTime: {
      type: String,
      required: true,
      trim: true,
    },
    // Other fields as needed
  },
  {
    timestamps: true,
  }
);

const Outpass = mongoose.model("Outpass", outpassSchema);

export default Outpass;
