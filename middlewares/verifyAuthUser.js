module.exports=(req,res,next)=>{
    if(!req.user){
        //no inició sesión --> mandar mensaje de error
        return res.status(401).json({error:'Inicie sesión'});
    }
    //sino, ir al siguiente middleware
    next();
}