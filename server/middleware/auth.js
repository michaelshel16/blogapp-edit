const jwt = require('jsonwebtoken');

 const verifyToken = async(req,res,next)=>{

    try 
    
    { 
        const authHeader =  req.header("Authorization") 
        
        const token      = authHeader&&authHeader.split(' ')[1];

      if(!token)
      {
       
        return res.status(403).send("Access Denied")

      }
      
      
        const verified = jwt.verify(token,process.env.JWT_CODE)
        req.user       = verified
        next();
      
    } 
    
    catch (error) 
    {
        res.status(500).json({message:error.message});
    }
}

module.exports = verifyToken;