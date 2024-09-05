const mongoose=require('mongoose')
const config=require('config')
 
const debug=require('debug')('development: mongoose')

// Here we have user the config.get() to get the port of mongoose but other people over the youtube use .env file to set-up the post dynamically ... so by handing things from the config file we can also handle different-different setting like for the development , default , production and many more...
mongoose.connect(`${config.get('MONGOOSE_PORT')}/BagEdge`).then(()=>{
    debug('mongoose is connected')
    // console.log('connected to db - console log'); 

}).catch((err)=>{
    console.log(err);
    
})


module.exports=mongoose.connection