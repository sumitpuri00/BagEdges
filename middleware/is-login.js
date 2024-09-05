const jwt=require('jsonwebtoken')
const userModel=require('../models/user-model')

module.exports= async (req,res,next)=>{
    if(!req.cookies.token){
        req.flash('error', 'you need to login first')
        return res.status(401).redirect('/')
    }
    try {
        var decoded = jwt.verify( req.cookies.token, process.env.SECRET_KEY);
        // console.log(decoded) 

        const user=await userModel.findOne({email: decoded.email}).select('-password') /* here "-password means we are saying we don't want the password because the user we also have the password and we don't want to send the password too  with the user " */
        req.user=user /* we are adding the user in the "req" , so that any route who use this "is-login" as a middleware can access the user detail  */

        next()
    } catch (error) {
        req.flash('error','something went wrong')
        // res.status(201).redirect('/')
        res.send('someone did something with your token')
    }
}