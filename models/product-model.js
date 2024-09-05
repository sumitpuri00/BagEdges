const mongoose= require('mongoose')

const productSchema=mongoose.Schema({
    image: Buffer,
    name: String,
    price: Number,
    discount: {
        type: Number,
        default: 0
    },
    bgColour: String,
    panelColour: String,
    textColour:  String

})

const productModel=mongoose.model('product',productSchema)
 

module.exports= productModel