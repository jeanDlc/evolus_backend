const Cliente=require('../models/Cliente');
const { validationResult } = require('express-validator');

exports.handlerValidationErrors=(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }else{
        return next();
    }
}
exports.getClients=async(req,res)=>{
    const clientes= await Cliente.findAll();
    res.status(200).json(clientes);
    
}
exports.newClient=async(req,res)=>{
    
    try {
        await Cliente.create(req.body);
        res.status(200).json({msg:'Nuevo cliente guardado correctamente'});
    } catch (error) {
        console.log( error);
        res.status(500).json({error: 'Ocurrió un error'});
    }
}