const jwt=require('jsonwebtoken');
require('dotenv').config();
module.exports=(req,res,next)=>{
    const authHeader=req.get('Authorization');
    if(authHeader){
        //obtener el token
        const token=authHeader.split(' ')[1];
        try {
            const user=jwt.verify(token ,process.env.SECRETA );
            req.user=user;
        } catch (error) {
            console.log('TOKEN NO VÁLIDO',  error);
        }
    }
    next();
}