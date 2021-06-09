const Rol=require('../models/Rol');
exports.initializeRolTables=async()=>{
    //crear los primeros roles si no existen
    const num=await Rol.count();
    if(num==0){
        await Rol.bulkCreate(
            [
                {nombre:'Administrador de sistema'},
                {nombre:'Asesor de servicio'},
                {nombre:'Jefe de taller'},
                {nombre:'Técnico automotriz'}
            ]
            
        )
    }
    
}