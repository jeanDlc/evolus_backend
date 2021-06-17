const Proyecto =require('../models/Proyecto');
const Tarea=require('../models/Tarea');
const Proyecto_Empleado=require('../models/Proyecto_Empleado');
const Empleado=require('../models/Empleado');
const db=require('../config/db');
const Rol = require('../models/Rol');
const Cliente = require('../models/Cliente');
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
                attributes:['id', 'nombre', 'apellidos'],
                include:[{
                    model:Rol
                }]
            },
            {model:Tarea},
            {model:Cliente,
                attributes:['id', 'nombre', 'apellidos', 'num_telefonico']
            }
        ]});
        if(!project) return res.status(400).json({error:'No se encontró el proyecto que buscas'});
        res.status(200).json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Ocurrió un error'});
    }
}
exports.newProject=async(req,res)=>{
    const t=await db.transaction();
    try {
        
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
exports.deleteProject=async(req,res)=>{
    
    try {
        const deleted=await Proyecto.destroy({where:{id:req.params.id}, cascade:true}); 
        if(!deleted){
            return res.status(400).json({error:'No se pudo borrar el proyecto'})
        }
        res.status(200).json({msg:'Proyecto eliminado con éxito'})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Ocurrió un error'})
    }
}
exports.getProjectTasks=async(req,res)=>{
    
    try {
        const tasks=await Tarea.findAll({where:{ProyectoId:req.params.id}});
        if(!tasks) return res.status(400).json({error:'No se encontró'});
        res.status(200).json(tasks);

    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Ocurrió un error'});
    }
}
exports.newProjectTask=async(req,res)=>{
    try {
        const {nombre,descripcion, fecha_fin}=req.body;
        const ProyectoId=req.params.id;
        const project=await Proyecto.findByPk(ProyectoId);

        if(!project){
            return res.status(400).json({error:'No se puede crear una tarea para un proyecto que no existe'});
        }

        // inicio proyecto < fecha final tarea < fin de proyecto
        if(fecha_fin>=project.fecha_inicio && fecha_fin<=project.fecha_fin ){
            await Tarea.create({ProyectoId,nombre,descripcion, fecha_fin});
        }else{
            await Tarea.create({ProyectoId,nombre,descripcion, fecha_fin: project.fecha_fin});
        }
        
        res.status(200).json({msg:'Tarea creada correctamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Ocurrió un error'})
    }
}