const User=require('../model/User')
const {StatusCodes}=require('http-status-codes')
const CustomError=require('../errors/index')
const{createTokenUser,attachCookiesToResponse}=require('../utils/index')
const register=async(req,res)=>{
    const {name,email,password}=req.body
 
    const isFirstAccount=await User.countDocuments({})===0
    // console.log(isFirstAccount)
    const role= isFirstAccount ? 'admin':'user';

    const user=await User.create({name,email,password,role})

    if(!user){
        throw new CustomError.BadRequestError('provide details')
    }
    const tokenUser=createTokenUser({user})
    attachCookiesToResponse({res,user:tokenUser})
    res.status(StatusCodes.CREATED).json({user})

}
const login=async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        throw new CustomError.BadRequestError('provide details')
    }
    const user=await User.findOne({email:email})
    if(!user){
        throw new CustomError.NotFoundError('no user with email')
    }
    const isMatch= await user.comparePassword(password)
    if(!isMatch){
        throw new CustomError.UnauthenticatedError('details wrong')
    }
    const tokenUser=createTokenUser({user})
    attachCookiesToResponse({res,user:tokenUser})
    res.status(StatusCodes.OK).json({tokenUser})
}

const logout=async(req,res)=>{
    res.cookie('token','logout',{
        httpOnly:true,
        expires:new Date(Date.now())
    })
}

module.exports={login,logout,register}