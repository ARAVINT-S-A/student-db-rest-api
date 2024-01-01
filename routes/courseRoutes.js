const express=require('express')
const router=express.Router()

const{registerCourse,getAllCourses,viewRegisteredCourses}=require('../controllers/courseController')

router.route('/registercourse').post(registerCourse)
router.route('/').get(getAllCourses)
router.route('/viewregistedcourses').get(viewRegisteredCourses)

module.exports=router