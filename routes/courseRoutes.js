const express=require('express')
const router=express.Router()

const{registerCourse,getAllCourses,viewRegisteredCourses,editCourseDetails}=require('../controllers/courseController')
const {authenticateUser,authorizePermissions}=require('../middleware/authentication')

router.route('/registercourse').post(authenticateUser,registerCourse)
router.route('/').get(getAllCourses)
router.route('/viewregistedcourses').get(authenticateUser,viewRegisteredCourses)
router.route('/:id').patch(authenticateUser,authorizePermissions('admin'),editCourseDetails)

module.exports=router