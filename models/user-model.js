const mongoose= require('mongoose')

const userSchema=mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,  // Enforces uniqueness at the schema level
    },
    password: String,
    cart:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'product' /* this will tell us that the objectId we are savin is of product model */
         
    }],
    orders: { 
        type: Array,
        default: []
    },
    contactNo: Number,
    picture: String

})

const userModel=mongoose.model('user',userSchema)
 

module.exports=userModel