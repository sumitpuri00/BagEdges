const express=require('express')
const router=express.Router()
const {registerUser,userLogin,logOut}=require('../controllers/user-controller')

// router.get('/',(req,res)=>{
//     res.send(process.env)
// })

router.post('/register',registerUser)

router.post('/login',userLogin)

router.get('/log-out',logOut)


module.exports=router
