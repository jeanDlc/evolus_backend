const Proyecto =require('../models/Proyecto');
const Tarea=require('../models/Tarea');
const Proyecto_Empleado=require('../models/Proyecto_Empleado');
const Empleado=require('../models/Empleado');
const db=require('../config/db');
exports.getProjects=async(req,res)=>{
    const projects=await Proyecto.findAll();
    res.status(200).json(projects);
}
exports.getProjectById=async(req,res)=>{
    try {
        //get the project and their employees and tasks
        const {id}=req.params;
        const project=await Proyecto.findByPk(id, {include:[
            {model:Empleado,
                attributes:['id', 'nombre', 'apellidos']
            },
            {model:Tarea}
        ]});
        if(!project) return res.status(400).json({error:'No se encontró el proyecto que buscas'});
        res.status(200).json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Ocurrió un error'});
    }
}
exports.newProject=async(req,res)=>{
    try {
        const t=await db.transaction();
        const project= await Proyecto.create(req.body, {transaction:t});
        const arrayEmployeesId=req.body.empleados;
        await Proyecto_Empleado.bulkCreate(arrayEmployeesId.map(employeeId=>{
            return {
                ProyectoId:project.id,
                EmpleadoId:employeeId
            }   
        }), {transaction:t});
        await t.commit();
        res.status(200).json({msg:'Proyecto creado exitosamente'});
    } catch (error) {
        console.log(error.message);
        await t.rollback();
        res.status(500).json({error:'No se pudo crear el proyecto'});
    }
}