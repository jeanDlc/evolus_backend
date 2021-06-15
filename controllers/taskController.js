const Tarea=require('../models/Tarea');
const Proyecto=require('../models/Proyecto');
exports.getTaskById=async(req,res)=>{
    const task=await Tarea.findByPk(req.params.id);
    if(!task){
        return res.status(400).json({error:'No se encontró la tarea'})
    }
    res.status(200).json(task);
}
exports.deleteTask=async(req,res)=>{
    try {
        const task=await Tarea.destroy({where: { id:req.params.id }});
        if(!task) return res.status(400).json({error:'No se pudo eliminar la tarea'});
        res.status(200).json({msg:'Tarea eliminada'});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Ocurrió un error'})
    }

}
exports.updateTask=async(req,res)=>{
    try {
        const {ProyectoId, nombre, descripcion, fecha_fin}=req.body;
        const project=await Proyecto.findByPk(ProyectoId);
        if(!project){
            return res.status(400).json({error:'No se puede actualizar una tarea de un proyecto que no existe'});
        }
        let newFinalDate;
        if(fecha_fin>= project.fecha_inicio && fecha_fin<=project.fecha_fin){
            newFinalDate=fecha_fin;
        }else{
            newFinalDate=project.fecha_fin;
        }
        
        const [numUpdatedTask] =await Tarea.update({
            nombre,
            descripcion,
            fecha_fin:newFinalDate
        }, {where:{ id: req.params.id}});

        if(numUpdatedTask===0) return res.status(400).json({error:'No se pudo actualizar la tarea'});
        res.status(200).json({msg:'Tarea actualizada con éxito'});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Ocurrió un error'})
    }
}