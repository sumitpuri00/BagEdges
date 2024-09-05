const express=require('express')
const router=express.Router()

const isLogin=require('../middleware/is-login') /* This time we didn't use this {anyName} because this time we send the actual function not the object .. isLogin is A proper function . this time we write the syntax this way -->  "module.exports= async (req,res,next) =>{}" */
const productModel=require('../models/product-model')
const userModel=require('../models/user-model')

router.get('/',(req,res) =>{
    const flashError=req.flash('error')
    res.render('index',{error :flashError ,loggedin: false})
})

router.get('/shop',isLogin,async (req,res)=>{
    try {
        const products=await productModel.find() /* find gives us a array */
        const successmessage=req.flash('success')
        res.status(200).render('shop',{products,success: successmessage})

    } catch (error) {
        res.send(error.message)
    }
    
})

router.get('/addtocart/:id',isLogin,async (req,res)=>{
    try {
        let user=await userModel.findOne({email: req.user.email}) /* this will gives us a object */
        user.cart.push(req.params.id)/* in our "user schema" we have created cart of [] , so now we are pushing the product id inside the []  */
        await user.save()
        req.flash('success', 'item added into cart !')
        res.redirect('/shop')

    } catch (error) {
        res.send(error.message)
    }
    
})


router.get('/cart',isLogin,async (req,res)=>{
    try {
        let user= await userModel.findOne({email: req.user.email}).populate('cart')
        
        res.status(200).render('cart',{cart: user.cart})

    } catch (error) {
        res.send(error.message)
    }
    
})

module.exports=router