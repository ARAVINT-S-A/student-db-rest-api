const {StatusCodes}=require('http-status-codes')
const CustomError=require('../errors/index')
const User=require('../model/User')


const getAllUser=async(req,res)=>{
    const users=await User.find({role:'user'}).select('-password')
    res.status(StatusCodes.OK).json({users})
}


const showCurrentuser=async(req,res)=>{
    const userId=req.user.userId
    const user=await User.find({_id:userId}).select('-password')
    res.status(StatusCodes.OK).json({user})
}

const updateUser=async(req,res)=>{
    res.send('update')
}

const updateUserPassword=async(req,res)=>{
    res.send('update password')
}

module.exports={
    getAllUser,
    showCurrentuser,
    updateUser,
    updateUserPassword
}