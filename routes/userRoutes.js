const express=require('express')
const router=express.Router()
const {getAllUser,
    getSingleUser,
    showCurrentuser,
    updateUser,
    updateUserPassword}=require('../controllers/userController')

const {authenticateUser,authorizePermissions}=require('../middleware/authentication')
router.route('/').get(authenticateUser,authorizePermissions('admin'),getAllUser)
router.route('/showcurrentuser').get(authenticateUser,showCurrentuser)
router.route('/updateUser').patch(authenticateUser,updateUser)
router.route('/updateUserPassword').patch(authenticateUser,updateUserPassword)


module.exports=router   