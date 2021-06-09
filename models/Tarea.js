const { DataTypes} = require('sequelize');
const db=require('../config/db');
const Proyecto = require('./Proyecto');
const Tarea=db.define('Tarea',{
    id:{
        type:DataTypes.UUID,
        primaryKey:true
    },
    nombre:{
        type:DataTypes.STRING(40),
        allowNull:false
    },
    descripcion:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    estado:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }, 
    fecha_fin:{
        type:DataTypes.DATE,
        allowNull:false
    },
});
Tarea.belongsTo(Proyecto);
module.exports=Tarea;