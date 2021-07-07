const Empleado=require('../models/Empleado');
const jwt=require('jsonwebtoken');
require('dotenv').config();
exports.authenticateUser=async(req,res)=>{
    //el usuario es el empleado
    const {email,pass}=req.body;
    //buscar al emeplado/usuario
    const employee=await Empleado.findOne({where:{email}});
    if(!employee) return res.status(401).json({error:'No se encontró al empleado'});
    //verificar si ingresó correctamente la contraseña
    if(!employee.verifyPassword(pass)){
        //error
        return res.status(401).json({error:'Email o contraseña incorrecta'});
    }
    //la contraseña se ingresó correctamente
    //crear token
    const token=jwt.sign({
        id:employee.id,
        nombre:employee.nombre,
        apellidos:employee.apellidos,
        email:employee.email,
        RolId:employee.RolId
    }, process.env.SECRETA, {expiresIn:60*60*3});
    res.status(200).json(token);
}
exports.getAuthenticatedUser=(req,res)=>{
    res.json(req.user)
}