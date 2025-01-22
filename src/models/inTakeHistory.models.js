
import mongoose, { Schema } from "mongoose";

const inTakeHistorySchema = new Schema(
    {
       waterIntake:{
        type: Number,
        required: true
       },
       time:{
        type: Date,
        required: true,
       }
    },{timestamps: true}
)

export const inTakeHistory = mongoose.model('inTakeHistory',inTakeHistorySchema);