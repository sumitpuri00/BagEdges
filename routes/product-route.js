const express=require('express')
const router=express.Router()
const productModel=require('../models/product-model')
const upload=require('../config/multer-config')

router.post('/create',upload.single('image'), async(req,res)=>{
    const {name,price,discount,bgcolour,panelcolour,textcolour}=req.body 
    try {
        const product=await productModel.create({
            image:req.file.buffer, /* req.file gives us a object{} and inside the object we have a field called "buffer" */
            name,
            price,
            discount,
            bgcolour,
            panelcolour,
            textcolour
        })  
        // res.send(product);
        
        req.flash('success',"product is created")
        res.status(200).redirect('/owner/admin')
    } catch (error) {
        res.send(error.message)
    }
    
 
    

})

module.exports=router
