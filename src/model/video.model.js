import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
// const FullNameSchema = new mongoose.Schema({
//     firstName : {
//         type : string,
//         required: true,
//         lowercase: true
//     },
//     lastName : {
//         type: string,
//         required: true,
//         lowercase: true     
//     }
// })

const videoSchema = new mongoose.Schema(
{
   videoFile :{
    type: string, //cloudinary url
    required : true,
   },
   thumbnail : {
    type : string, 
    required: true, 
   },
   owner : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    required: true, 
   },
   title : {
    type : string ,
    required : true ,
    trim : true,
   },
   description : {
    type : string ,
    required : true ,
    trim : true,
   },
   duration : {
    type : Number,
    required: true,

   },
   views : {
    type : Number,
    default : 0,
   },
   isPublished : {
    type :Boolean,
    default : true,
   },
   



},{timestamps : true});

videoSchema.plugin(mongooseAggregatePaginate); 

export const Video =mongoose.model("Video",videoSchema);