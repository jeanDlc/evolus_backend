
const Rol=require('../models/Rol');
exports.getRoles=async(req,res)=>{
    const rols=await Rol.findAll();
    res.status(200).json(rols);
}