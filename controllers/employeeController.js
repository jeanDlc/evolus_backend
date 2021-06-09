const Empleado=require('../models/Empleado');
exports.getEmployees=async(req,res)=>{
    const empleados=await Empleado.findAll();
    res.status(200).json(empleados);
}

exports.newEmployee=async(req,res)=>{
    try {
        await Empleado.create(req.body);
        res.status(200).json({msg:'Nuevo empleado guardado correctamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Ocurrió un error'});
    }
}