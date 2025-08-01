import {vs as cloudinary} from 'cloudinary';
import fs from 'fs';
// CONTROL SPACE FOR MORE OPTIONS

// Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key:  process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

const uploadFileOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) {
            throw new Error("No file path provided for upload");
        }
       const response = await cloudinary.v2.uploader.upload(localFilePath , {
            resource_type: "auto" // Automatically detect the resource type (image, video, etc.)
       })
       // file has been uploaded successfully
       console.log("File uploaded successfully on Cloudinary ", response.url);
       return response;
       
    }catch (error){
        fs.unlinkSync(localFilePath); // Delete the file from local storage
        console.error("Error uploading file to Cloudinary: ", error.message);
        throw error; // Re-throw the error for further handling
    }
}

export {cloudinary, uploadFileOnCloudinary};