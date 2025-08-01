import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import { uploadFileOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async(req , res)=>{
    
//example of asyncHandler usage
    // res.status(200).json({
    //     message : "User registered successfully",
    // })


//Algorithm for user Registration
    //1. Get user data from request body i.e frontend
    //2.Validate the user data
    //3.CHeck if user already exists in the database
    //4.check for image &a avatar 
    //5.check for image upload on cloudinary 
    //6.create a user object -> create entry in the database
    //7. remove password & refresh token from the user object
    //8. check for user creation success
    //9. send response to the frontend

    // Step 1: Get user data from request body
    const {username ,email , fullname , password} = req.body;
    console.log(`Username: ${username}, Email: ${email}`);

    // Step 2: Validate the user data
    if([username , email , fullname , password ].some((fields)=> fields?.trim() === "")){
        throw new ApiError(400 , "All fields are required")
    }//check if any field is empty

    // Step 3: Check if user already exists in the database
    const existedUser = await User.findOne(({
        $or :[{ username },{ email },{ fullname }]
    }))
    if(existedUser){
        throw new ApiError(409, "User already exists with this username or email");
    }

    // Step 4: Check for image & avatar
    const avatarPath = req.files?.avatar[0]?.path;      //gets the url of the uploaded avatar image
    if(!avatarPath){
        throw new ApiError(400, "Avatar image is required");
    }
    const coverImagePath = req.files?.coverImage[0]?.path;  //gets the url of the uploaded cover image
    // if(!coverImagePath){
    //     throw new ApiError(400, "Cover image is required");
    // }

    // Step 5: Check for image upload on cloudinary
    const avatar = await uploadFileOnCloudinary(avatarPath);
    const coverImage = await uploadFileOnCloudinary(coverImagePath);

    // Step 6: Create a user object -> create entry in the database
    const User = await User.create({
        username : username.toLowerCase(),
        email,
        fullname,
        password, // Ensure password is hashed before saving
        avatar : avatar.url, // Store the URL of the uploaded avatar
        coverImage : coverImage?.url || "", // Store the URL of the uploaded cover image, if available,
    })

    // Step 7: Remove password & refresh token from the user object
    const UserCreated = await User.findById(User._id).select("-password -refreshToken");

    // Step 8: Check for user creation success
    if(!UserCreated){
        throw new ApiError(500, "User creation failed");
    }

    // Step 9: Send response to the frontend
    return res.status(201).json(
        new ApiResponse(201 , UserCreated , "User registered successfully")
    )
})

export {registerUser};