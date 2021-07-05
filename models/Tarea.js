const { DataTypes} = require('sequelize');
const db=require('../config/db');
const Proyecto = require('./Proyecto');
const Tarea=db.define('Tarea',{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV1
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
    }
});
Tarea.belongsTo(Proyecto);
Proyecto.hasMany(Tarea);
module.exports=Tarea;
