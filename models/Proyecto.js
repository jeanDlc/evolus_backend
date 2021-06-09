const { DataTypes} = require('sequelize');
const db=require('../config/db');
const Cliente = require('./Cliente');
const Empleado = require('./Empleado');
const Proyecto=db.define('Proyecto',{
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
    fecha_inicio:{
        type:DataTypes.DATE,
        allowNull:false
    },
    fecha_fin:{
        type:DataTypes.DATE,
        allowNull:false
    },
    num_matricula:{
        type:DataTypes.STRING(7),
        allowNull:false
    },
    monto:{
        type:DataTypes.STRING(10),
        allowNull:false
    },
    pagado:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
})
Proyecto.belongsTo(Cliente);
//Proyecto.belongsToMany(Empleado, { through: 'Proyecto_Empleado' });
module.exports=Proyecto;
