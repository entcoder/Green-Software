import mongoose from "mongoose";
import { ApiResponse } from "../utills/ApiResponse.js";
import { ApiError } from "../utills/ApiError.js";
import { asyncHandler } from "../utills/asyncHandler.js";
import { User } from "../models/user.model.js";



const grnerateAccessAndRefreshToken= async(userId)=>{
    //find user using userId
    //generate accesstoken and refreshtoken using functions in User model
    //assign refreshtoken to user.refreshtoken
    //save user 
    //return refreshtoken and accesstoken


    try {
        const user= await User.findById(userId)

        const refreshToken= user.generateRefreshToken()
        const accessToken= user.generateAccessToken()

        user.refreshToken= refreshToken;

        await user.save({validateBeforeSave: false})

        return {accessToken ,refreshToken}

    } catch (error) {
        throw new ApiError(500, "something went wrong while generating refreshtoken and accesstoken")
    }
}



const registerUser= asyncHandler ( async(req,res)=>{


    const {fullName,userName,email,password} = req.body

    if(fullName===""){
       throw new ApiError(400, "Fullname is required")
    }

    if(userName===""){
        throw new ApiError(400, "username is required")
     }
    if(email===""){
        throw new ApiError(400, "email is required")
     }
    if(password===""){
        throw new ApiError(400, "password is required")
    }


    const existingUser= await User.findOne({
        $or: [{userName},{email}]
    })

    if(existingUser){
        throw new ApiError(409, "User already exists")
    }

    const user= await User.create({
        fullName,
        email,
        password,
        userName
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )



})

const loginUser = asyncHandler(async(req, res)=>{


 const {email, password}= req.body

 if(!email){
   throw new ApiError(400, "email required")

 }

 const user= await User.findOne(
    {email}
        
 )

 if(!user){
    throw new ApiError(404, "User does not exists")
 }
console.log(user)

 const Valid = await user.isPasswordCorrect(password)
  console.log(Valid)
   if (!Valid) {
    throw new ApiError(401, "Invalid user credentials")
    }

 const {accessToken , refreshToken}= await grnerateAccessAndRefreshToken(user._id)


const loggedInUser= await User.findById(user._id).select("-password -refreshToken")

const options= {
    httpOnly: true,
    secure: true
}


return res
.status(200)
.cookie("refreshToken", refreshToken, options)
.cookie("accessToken", accessToken, options)
.json(
    new ApiResponse
    (
        200,
       {
           user: loggedInUser, refreshToken,accessToken
       },
       "user logged in successfully"
    )
)



})

export {registerUser,loginUser}