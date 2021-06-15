const Empleado=require('../models/Empleado');
const Rol=require('../models/Rol');
exports.getEmployees=async(req,res)=>{
    //TODO: verificar los permisos de usuario
    try {
        const employees=await Empleado.findAll({include:[{
            model:Rol
        }]});
        res.status(200).json(employees);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}
exports.getEmployeeById=async(req,res)=>{
    const {id}=req.params;
    try {
        const employee=await Empleado.findByPk(id, {include:[{
            model:Rol
        }]});
        if(!employee) return res.status(400).json({error:'No se pudo encontrar al empleado'})
        res.status(200).json(employee);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Ocurrió un error'});
    }
}

exports.newEmployee=async(req,res)=>{
    //TODO: verificar los permisos de usuario
    try {
        const alreadyExist=await Empleado.findOne({where:{dni:req.body.dni}})
        if(alreadyExist) {
            return res.status(301).json({msg:'Un empleado con ese DNI ya fue registrado'});
        }
        await Empleado.create(req.body);
        res.status(200).json({msg:'Nuevo empleado guardado correctamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Ocurrió un error'});
    }
}
exports.updateEmployee=async(req,res)=>{
    //TODO: verificar permisos
    try {
        const {nombre,apellidos,num_telefonico,dni,ruc,direccion,pass,RolId}=req.body;
        const [numUpdatedEmployees]=await Empleado.update({
            nombre,
            apellidos,
            num_telefonico,
            dni,
            ruc,
            direccion,
            pass,
            RolId,
        } , {where:{id:req.params.id}});
        if(numUpdatedEmployees===0){
            return res.status(400).json({error:'No se pudo actualizar'})
        } 
        res.status(200).json({msg:'Empleado actualizado correctamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Ocurrió un error'});
    }
}
//TODO: afiliar otro correo si el usuario lo desea

exports.deleteEmployee=async(req,res)=>{
    try {

        const deleted=await Empleado.destroy({where:{id:req.params.id}});
        if(!deleted){
            return res.status(400).json({error:'No se pudo eliminar el registro'})
        }
        res.status(200).json({msg:'Empleado eliminado'});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Ocurrió un error'});
    }
}