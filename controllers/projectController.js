const Proyecto =require('../models/Proyecto');
exports.getProjects=async(req,res)=>{
    const projects=await Proyecto.findAll();
    res.status(200).json(projects);
}

exports.newProject=async(req,res)=>{
    try {
        await Proyecto.create(req.body);
        res.status(200).json({msg:'Proyecto creado exitosamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'No se pudo crear el proyecto'});
    }
}