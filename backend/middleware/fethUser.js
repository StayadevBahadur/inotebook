const jwt = require('jsonwebtoken'); 
const JWT_SECRET = 'SatyadevIs#Savage';

const fetchUser = (req,res,next)=>{
// Get the user and add the user id to the user request object
const token = req.header('auth-token')
if(!token){
    res.status(401).send({error:"please athenticate  with the valid token"})
}
try {
    const data = jwt.verify(token,JWT_SECRET)
    req.user = data.usser;
    next()

} catch (error) {
    res.status(401).send({error:"please athuraissed with the valid token"})
}

}

module.exports = fetchUser;