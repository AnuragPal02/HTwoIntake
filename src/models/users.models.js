import mongoose, { Schema } from "mongoose";
import { inTakeHistory } from "./inTakeHistory.models";

const userSchema = new Schema(
    {
       username : {
        type: String,
        unique: true,
        required: true
       },
       email:{
        type:String,
        required: true,
        unique: true,
        lowercase: true
       },
       password:{
        type:String,
        required: true
       },
       fullName : {
        type : String,
        required : true,
        trim: true,
        lowercase: true
       }, 
       Avatar:{
        type: String,
        required: true,
       },
       waterIntake :{
        type: Number,
        required: true,
        default: 2000
       },
       inTakeHistory:[
        inTakeHistory
       ]
    },{timestamps:true}
)

export const User = mongoose.model('User',userSchema);