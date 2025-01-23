import mongoose, { Schema } from "mongoose";

const notifictionSchema = new Schema(
    {
       userId : {
        type: Schema.Types.ObjectId,
        ref : "Users",
        required : true
       },

       notificationType : {
        type: String,
        enum : ['Goal Reached','reminder'], required: true
       },
       sentAt : {
        type: Date,
        required: true
       }
    },{timestamps: true}
)

export const Notification = mongoose.model('Notification',notifictionSchema);