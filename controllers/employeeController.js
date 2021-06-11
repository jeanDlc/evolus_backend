const Empleado=require('../models/Empleado');
exports.getEmployees=async(req,res)=>{
    //TODO: verificar los permisos de usuario
    const empleados=await Empleado.findAll();
    res.status(200).json(empleados);
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