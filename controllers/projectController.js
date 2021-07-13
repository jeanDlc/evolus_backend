const Proyecto =require('../models/Proyecto');
const Tarea=require('../models/Tarea');
const Proyecto_Empleado=require('../models/Proyecto_Empleado');
const Empleado=require('../models/Empleado');
const db=require('../config/db');
const Rol = require('../models/Rol');
const Cliente = require('../models/Cliente');
exports.getProjects=async(req,res)=>{
    let projects=[];
    try {
        if(req.user.RolId===4){
            //los técnicos automotrices solo pueden ver los proyectos que les incumbe
            projects=await filterProjectsByEmployee(req.user.id);
        }
        else{
            projects=await Proyecto.findAll();
        }
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({error:'Hubo un error'});
    }
}
const filterProjectsByEmployee=async empId=>{
    const projects=await Proyecto.findAll({include:[
        {model:Empleado,
            attributes:[],
            where:{id:empId}
        }
    ]});
    return projects;
}
exports.getProjectById=async(req,res)=>{
    try {
        //obtiene el proyecto (también los empleados y tareas relacionadas)
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
exports.updateProject=async(req,res)=>{
    const t=await db.transaction();
    try {
        //buscando el proyecto que se va a actualizar
        const project=await Proyecto.findByPk(req.params.id);
        if(!project) return res.status(404).json({error:'El proyecto no fue encontrado'});
        //actualizando campos del proyecto
        const {nombre,ClienteId,fecha_inicio,fecha_fin,descripcion,num_matricula,monto}=req.body;
        project.nombre=nombre;
        project.ClienteId=ClienteId;
        project.fecha_inicio=fecha_inicio;
        project.fecha_fin=fecha_fin;
        project.descripcion=descripcion;
        project.num_matricula=num_matricula;
        project.monto=monto;
        project.save({transaction:t}); //guardando cambios

        //actualizanto tabla Projecto_Empleado
        const arrayEmployeesId=req.body.empleados;
        await Proyecto_Empleado.destroy({where:{ProyectoId:project.id}, transaction:t});
        await Proyecto_Empleado.bulkCreate(arrayEmployeesId.map(employeeId=>{
            return {
                ProyectoId:project.id,
                EmpleadoId:employeeId
            }   
        }), {transaction:t});

        //ejecutar transacción
        await t.commit();
        res.status(200).json({msg:'Proyecto actualizado correctamente'});
    } catch (error) {
        await t.rollback();
        console.log(error.message)
        res.status(500).json({error:'No se pudo actualizar'})
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
        res.status(500).json({error:'Ocurrió un error'})
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
        const {nombre,descripcion}=req.body;
        const ProyectoId=req.params.id;
        const project=await Proyecto.findByPk(ProyectoId);

        if(!project){
            return res.status(400).json({error:'No se puede crear una tarea para un proyecto que no existe'});
        }
        await Tarea.create({ProyectoId,nombre,descripcion});
        
        res.status(200).json({msg:'Tarea creada correctamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Ocurrió un error'})
    }
}