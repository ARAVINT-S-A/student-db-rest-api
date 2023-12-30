const mongoose=require('mongoose')

const CoursesSchema=new mongoose.Schema({
    name:{type:String,required:true},
    courseCode: {
        type: String,
        required: true,
        unique: true
    },
    capacity: {
        type: Number,
        required: true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    }
})

module.exports=mongoose.model('Courses',CoursesSchema)