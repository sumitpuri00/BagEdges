const express=require('express')
const router=express.Router()
const Joi=require('joi')
/*
The dotenv package looks for a file named .env in the root of your project.
This file typically contains key-value pairs representing environment variables,
*/

// The .config() method in require('dotenv').config() is used to load and parse the environment variables from a .env file into process.env in your Node.js application.

/* After running require('dotenv').config(), you can access these variables throughout your application using process.env.KEYNAME. like NODE_ENV is Key name that is created in .env file
*/

const ownerModel=require('../models/owner-model')

const bcrypt = require('bcrypt');
const saltRounds = 10;
 

router.get('/admin',(req,res)=>{
    const success=req.flash('success') /* this gives us array in which multiple flash message can have.. */
    res.status(200).render('createproducts',{success})
})

const schema = Joi.object({
    fullname: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
});
  
if(process.env.NODE_ENV === 'development'){
    router.post('/create', async (req,res) =>{
        const user=await ownerModel.find();
        /* here we have use have used user.length because the find always retuen a [], if find() get the value it return a [] of object if not then an empty [] */
        if (user.length > 0) {
            return res.status(503).send('couldn\'t create owner because owner already exists'); // Sends status 503 with the message
        }

        const { error } = schema.validate(req.body);

        if (error) {
            // Send a 400 Bad Request response if validation fails
            return res.status(400).json({ error: error.details[0].message });  /* here .json() is converting the JSobject into json for our clint or frontEnd and  error.details[0].message <-- we are just scraping the which part is missing using the error . error is an object and inside it we have all the error .. just log the error to find it out */
        }

        const {fullname,email,password}= req.body;
        try {
            
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(password, salt,async function(err, hash) {
                    if(error){
                        return res.send(error.message)
                    }
                    const owner=await ownerModel.create({
                        fullname,
                        email,
                        password: hash
                    })
                
                    res.status(200).send(owner); // Sends status 200 with the message
                });
            });
        } catch (error) {
            res.send(error.message); 
            
        }

       
    })
    

}else{
    console.log('you are now in '+ process.env.NODE_ENV);
    
}


module.exports=router




/*       ----- all the things below are just note -----
link for the given chat ---- [ https://chatgpt.com/c/2350f912-7ab1-4120-8ddb-1cf72735c681 ]


return res.status(400).json({ error: error.details[0].message });


In Express.js, the .json() method is used to send a JSON response back to the client. Here's why it's used in this context:

Why Use .json()?
- Response Format: When you use .json(), Express automatically sets the Content-Type header of the response to application/json. This tells the client (such as a browser or API consumer) that the data being returned is in JSON format.

- Data Serialization: The .json() method serializes the JavaScript object or array into a JSON string. This is necessary because HTTP responses are sent as plain text, so the JavaScript object needs to be converted into a format that can be transmitted over the network.

- Client Expectation: In modern web applications, clients often expect responses in JSON format, especially when interacting with RESTful APIs. Using .json() ensures that the response is in the correct format for these clients.

 */
