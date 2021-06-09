const { DataTypes} = require('sequelize');
const db=require('../config/db');
const Rol=db.define('Rol',{
    id:{
        type:DataTypes.UUID,
        primaryKey:true
    },
    nombre:{
        type:DataTypes.STRING(40),
        allowNull:false
    }
})
module.exports=Rol;
