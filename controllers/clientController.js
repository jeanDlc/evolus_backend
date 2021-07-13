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

exports.getClientById=async(req,res)=>{
    const {id}=req.params;
    try {
        const client=await Cliente.findByPk(id);
        if(!client) return res.status(400).json({error:'No se pudo encontrar al cliente'});
        res.status(200).json(client);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Ocurrió un error'});
    }
}

exports.newClient=async(req,res)=>{
    //TODO admin y asesor de serv tienen acceso
    try {
        const alreadyExist=await Cliente.findOne({where:{dni:req.body.dni}});
        if(alreadyExist){
            return res.status(301).json({msg: 'Ese cliente ya está registrado'})
        }
        await Cliente.create(req.body);
        res.status(200).json({msg:'Nuevo cliente guardado correctamente'});
    } catch (error) {
        console.log( error);
        res.status(500).json({error: 'Ocurrió un error'});
    }
}

exports.updateClientById=async(req,res)=>{
    //TODO solo admin / mismo usuario / asesor de servicio
    const {id}=req.params;
    try {
        const {nombre, apellidos, num_telefonico,email,dni, ruc,direccion}=req.body;
        const [number]= await Cliente.update({nombre, apellidos, num_telefonico,email,dni, ruc,direccion},{
            where:{id}
        });
        if(number==1){
            return res.status(200).json({msg:'Cambios guardados correctamente'});
        }else if(number===0){
            res.status(400).json({error:'Cliente no encontrado'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Ocurrió un error'});
    }
}


exports.deleteClientById=async(req,res)=>{
    //TODO: solo admin o asesor de servicio
    const {id}=req.params;
    try {
        const number=await Cliente.destroy({where:{id}});
        if(number>=1) {
            return res.status(200).json({msg:'Cliente eliminado correctamente'});
        }else if(number===0){
            return res.status(404).json({error: 'Ese cliente no fue encontrado'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Ocurrió un error'});
    }
}