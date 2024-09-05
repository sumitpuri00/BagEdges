const userModel=require('../models/user-model')
const joi=require('joi')
const bcrypt=require('bcrypt')
const {getToken}=require('../utils/generate-token') /* this is also dStructuring */
const {hashp}=require('../utils/generate-hash')

const schema=joi.object({

    fullname: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().min(5).required(),
    contactNo: joi.number().min(10).required()
})

module.exports.registerUser=async (req,res) =>{
    try {
        const {error} =schema.validate(req.body);
        if(error){
            return res.status(400).json({errorMessaage: error.details[0].message})
        }
        
        let {fullname,email,password,contactNo} =req.body; /* this is called dStructuring of an object */
        let userDb= await userModel.findOne({email}) /* this findOne() return us a object and if it didn't find anything it return 'null'  .. also in js ! OR NOT operator gives us "false" is value in case of  "null" or "empty string " etc and "true" if something exist.  search about it too.. */
        if (userDb) {
            return res.status(401).send('user already exist, please login !')
        }
        try {

            hashp(password).then( async (hashedPassword) => {
                const user=await userModel.create({
                    fullname,
                    email,
                    password:hashedPassword,
                    contactNo
                })
                const token= getToken(user);  /* getToken is a function which return our jwtToken and it is created in util/generate-token.js file */
                res.cookie('token', token)
                req.flash('success','Account Created')
                res.redirect('/shop')
                    
            }).catch((err) => {
                console.error(err.message);
            });
 
        } catch (error) {
            res.status(500).send(error.message)
        }

    } catch (error) {
        res.status(400).send(error.message)
    }
}


module.exports.userLogin= async (req,res)=> {
    let {email,password}= req.body
    try {
        const user =await userModel.findOne({email})
        if(!user){
            req.flash('error',"check your email")
            return res.status(400).redirect('/')
        }
        bcrypt.compare(password, user.password, function(err, result) {
            console.log(result);
            if(result){
                const token=getToken(user)
                res.cookie('token', token)
                res.status(200).redirect('/shop')
            }else{
                req.flash('error', "check your password")
                return res.status(401).redirect('/')
            }
            

        });
    } catch (error) {
        res.status(500).send(error.message)
    }

}

module.exports.logOut=(req,res)=>{
    res.clearCookie('token')
    req.flash('error','You Have Log-Out')
    res.redirect('/')
}
