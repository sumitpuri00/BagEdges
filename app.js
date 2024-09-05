const express= require('express')
const app=express()

// setting up the ejs
app.set('view engine', 'ejs')
require('dotenv').config();

// requiring from models, need for database
const userModel=require('./models/user-model')
const productModel=require('./models/product-model')
const ownerModel=require('./models/owner-model')
const db=require('./config/mongoose-connect')

// requiring from routes, setting up the middleware for express.Route()
const userRoute=require('./routes/user-route')
const productRoute=require('./routes/product-route')
const ownerRoute=require('./routes/owner-route')
const indexRouter=require('./routes/index-router')

// all other stuffs
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const path=require('path')
const cookieParser=require('cookie-parser')
const flash=require('connect-flash')
const session=require('express-session')


// all middleware
app.use(cookieParser()) 
app.use(express.json())  /* It reads the body of incoming HTTP requests that have a Content-Type header of application/json and converts the JSON string into a JavaScript object. This parsed data is then accessible via req.body in your route handlers. Since it's middleware, it runs for every request to the server that matches the routes defined after it. If the incoming request's body contains valid JSON, express.json() will parse it; if not, it will throw an error */
app.use(express.urlencoded({extended:true}))  /* This middleware parses the body of incoming requests with Content-Type: application/x-www-form-urlencoded. This format is commonly used when submitting form data in web applications. After parsing, the data is available as a JavaScript object on req.body, similar to how express.json() works for JSON payloads. `extended: true`: When this option is set to `true`, it allows the parsing of nested objects and more complex data structures using the `qs` library */
app.use(express.static(path.join(__dirname,'public')))

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
//   cookie: { secure: true }
})) /* to use the "express-flash we need "express-session"  */
app.use(flash()); /* for flash of message */

app.use('/',indexRouter)
app.use('/users',userRoute)
app.use('/products',productRoute)
app.use('/owner',ownerRoute)


app.listen(3000,(err)=>{
    try {
        
        console.log('now, server is running.... ');

    } catch (error) {
        console.log(error);
        
    }
    
})
