//VALIDAN SI EL USUARIO TIENE LOS PERMISOS PARA LOS REQUEST QUE SOLICITA
exports.adminPermission=(req,res,next)=>{
    const userRol=req.user.RolId;
    if(userRol==1){
        req.permission=true;
    }
    next();
}
exports.asesorPermission=(req,res,next)=>{
    const userRol=req.user.RolId;
    if(userRol==2){
        req.permission=true;
    }
    next();
}
exports.JefeTallerPermission=(req,res,next)=>{
    const userRol=req.user.RolId;
    if(userRol==3){
        req.permission=true;
    }
    next();
}
exports.asesorPermission=(req,res,next)=>{
    const userRol=req.user.RolId;
    if(userRol==2){
        req.permission=true;
    }
    next();
}
exports.validatePermissions=(req,res,next)=>{
    if(!req.permission){
        return res.status(401).json({error:'No tienes permiso'});
    }
    next();
}