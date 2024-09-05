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
    products:{
        type: Array,
        default: []
    },
    
    gstNum: String,
    picture: String

})

const ownerModel=mongoose.model('owner',userSchema)
 

module.exports=ownerModel