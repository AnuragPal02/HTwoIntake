
import { User } from "../models/users.models.js";
import apiErrors from "../utils/apiErrors.js";

import apiResponse from "../utils/apiResponse.js"

//  ------register new user ----

// first take the username, email, password
// next check whether all the fields are in the correct format
// next check if the user already exist
// if user exist return login message else proceed forward
// next hash the password and store it in the database


const registerUser = async(req,res)=>{

     try {
      // taking the form details
      const {username, email, password, phoneNumber} = req.body;
    
      // checking whether any of the required field is empty 
      if(
         [username,email,password].map((item)=>(
            typeof item === 'string'? item.trim() : ""
         )).some((item)=>(item===''))
      ){
        throw new apiErrors(404,'wrong details');
      }
 
      //-------- checking whether user already exists --------
 
       const existedUser = await User.findOne({$or: [{username},{email}]});
 
       if(existedUser){
          throw new apiErrors(404,'User already exist, Please login');
       }
 
       const newUser = await User.create({
         username,
         email,
         password,
         phoneNumber,  
       })

       const user = await User.findById(newUser._id).select('-password -refreshToken');

       return res.status(200).json(
         new apiResponse(200,user,"User Registered successfully!!")
       )
     } catch (error) {
       throw new apiErrors('404', 'could not register...');
     }
}

export {registerUser};