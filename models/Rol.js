const { DataTypes} = require('sequelize');
const db=require('../config/db');
const Rol=db.define('Rol',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre:{
        type:DataTypes.STRING(40),
        allowNull:false
    }
}, {timestamps:false});

module.exports=Rol;
