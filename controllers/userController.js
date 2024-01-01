const {StatusCodes}=require('http-status-codes')
const CustomError=require('../errors/index')
const User=require('../model/User')


const getAllUser=async(req,res)=>{
    res.send('get all user');
}


const showCurrentuser=async(req,res)=>{
    res.send('showcurrent user')
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