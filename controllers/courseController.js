const {StatusCodes}=require('http-status-codes')
const CustomError=require('../errors/index')
const Courses=require('../model/courses')

const registerCourse=async(req,res)=>{
    const {name,courseCode}=req.body
    if(!name ||!courseCode){
        throw new CustomError.BadRequestError('provide details')
    }
    const course=await Courses.create({name,courseCode,user:req.user.userId})
    res.status(StatusCodes.CREATED).json({course})
}

const getAllCourses=async(req,res)=>{
    const courses=await Courses.find({})
    res.status(StatusCodes.OK).json({courses})
}

const viewRegisteredCourses=async(req,res)=>{
    const courses=await Courses.findById({user:req.user.userId})
    res.status(StatusCodes.OK).json({courses})
}

const editCourseDetails=async(req,res)=>{
    const {courseId}=req.params
    const {name,courseCode}=req.body
    const course=await Courses.findOne({_id:courseId})
    if(!course){
        throw new CustomError.BadRequestError("no course with id")
    }
    course.name=name
    course.courseCode=courseCode
    await course.save()
    res.status(StatusCodes.OK).json({msg:"course edited"})
}

module.exports={registerCourse,
getAllCourses,
viewRegisteredCourses,
editCourseDetails
}