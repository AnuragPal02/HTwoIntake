
import { UNSAFE_RouteContext } from "react-router-dom";
import { User } from "../models/users.models.js";
import apiErrors from "../utils/apiErrors.js";

import apiResponse from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessAndRefreshToken = async(userId)=>{
       try {
         const user = await User.findById(userId);
         if (!user) {
          throw new apiErrors(`can't find user with the id: ${userId}`);
         }
         const accessToken = user.generateAccessToken();
         const refreshToken = user.generateRefreshToken();

        //  console.log(accessToken,'in function');
        //  console.log(refreshToken,'in function'); 

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave:false});
        
        return {accessToken,refreshToken};
       }catch (error) {
          throw new apiErrors(400,'something went wrong while generating tokens');
       }
}


const registerUser = async(req,res)=>{

     try {
      // taking the form details
      const {username, email, password, phoneNumber} = req.body;

      // console.log(req.body);
    
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

      console.log("user registered successfully..");
       return res.status(200).json(
         new apiResponse(200,user,"User Registered successfully!!")
       )
     } catch (error) {
      console.error("Error during user registration:", error); // Log for debugging
      return res.status(500).json(
        new apiResponse(500, null, "Internal server error: could not register the user")
      );
     }
}

const loginUser = asyncHandler(async(req,res)=>{
  try {
    // steps to achieve login
    // step - 1 : take the input and validate it 
    // step - 2 : now check whether the user exists in the database using username or email
    // step - 3 : if exists then login
    
    const {username, email, password} = req.body;
    console.log(req.body);

    if(!username && !email){
      throw new apiErrors(404,'Please enter either username or email');
    }
    if(!password){
      throw new apiErrors(401,'Password is required..');
    }
    
    const user = await User.findOne({$or:[{username},{email}]});
    if(!user){
      throw new apiErrors(401,'user does not exist, please register..');
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid){
      throw new apiErrors(401,'Password is not correct...');
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);
    
    const loggedInUser = await User.findById(user._id).select('-password -refreshToken');

    const options = {
      httpOnly: true,
      secure: true
    }
     console.log("login successfull...");
     return res
     .status(200)
     .cookie('accessToken',accessToken,options)
     .cookie('refreshToken',refreshToken,options)
     .json(
      new apiResponse(
        200,
        {
          user: loggedInUser,accessToken, refreshToken
        },
        'User logged in successfully..'
      )
     )
  } catch (error) {
    console.error("something went wrong while loggin..",error);
    res.status(501).json(
       new apiResponse(501,'couldnot login...')
    )
  }
})

export {registerUser,loginUser};