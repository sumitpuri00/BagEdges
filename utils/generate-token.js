var jwt = require('jsonwebtoken');
const generateToken = (user)=>{
    return jwt.sign({email: user.email, id: user._id}, process.env.SECRET_KEY ,{expiresIn: '1h'});
    
}
module.exports.getToken=generateToken /* here '.token' means we are exporting the generateToken inside an object and '.token' is the key.  like this ----> {token : generateToken}  and we can also send this like this if we had multiple values ---> module.exports={token: generateToken, tokenTwo: generateTokenTwo }*/