import { useReducer } from "react";
import mongoose from mongoose
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema(
{
     username : {
        type: string ,
        required: true,
        unique : true,
        lowercase: true,
        trim : true,
        index  : true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim : true,
    },
    fullName : {
        type : string,
        required: true,
        unique: true,
        //lowercase: true,
        trim : true,
        index : true,
    },
    password : {
        type: String,
        required: [true,"Password is required"],
        minlength: 6
    },
    avatar : {
        type : string , //claudinary url
        required: true,

    },
    coverImage : {
        type : string , //claudinary url
        required: true, 
    },
    watchHistory : [[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Video",
    }]],
    refreshToken : {
        type : string ,
    },
},{timestamps: true});

//pre hook before saving the data 
UserSchema.pre("save" , async function(next){
    //checks update only if the password flied is modified 
    if(!this.isModified("password")) return next(),

    this.password= bcrypt.hash(this.password , 11),
    next()
})

UserSchema.methods.isPasswordCorrect = async function(password){
      return await  bcrypt.compare(password , this.password)
}

UserSchema.methods.generateAccessToken = function(){
     return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
            fullName : this.fullName,


    } ,process.env.ACCESS_TOKEN_SECRET , 
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    })
}

UserSchema.methods.generateRefreshtoken = function(){
   return jwt.sign({
        _id : this._id,
        
    } , process.env.REFRESH_TOKEN_SECRET , 
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    })
}

export const User = mongoose.model("User",UserSchema);
