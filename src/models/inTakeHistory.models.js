import mongoose, { Schema } from "mongoose";

const inTakeHistorySchema = new Schema(
  {
    waterIntake: {
      type: Number,
      required: true,
    },
    time: {
      type: Date,
      required: true,
      default: Date.now, // Default to current timestamp
    },
  },
  { timestamps: true }
);

// Export as a schema for embedding in other schemas
export const inTakeHistory = inTakeHistorySchema;
