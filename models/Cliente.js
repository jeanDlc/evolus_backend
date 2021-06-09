const { DataTypes} = require('sequelize');
const db=require('../config/db');
const Cliente=db.define('Cliente',{
    id:{
        type:DataTypes.UUID,
        primaryKey:true
    },
    nombre:{
        type:DataTypes.STRING(100),
        allowNull:false,
    },
    apellidos:{
        type:DataTypes.STRING(100),
        allowNull:false,
    },
    num_telefonico:{
        type:DataTypes.STRING(9),
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING(40),
        allowNull:false,
        validate:{isEmail:{
            msg:'Email no válido'
        }}
    },
    dni:{
        type:DataTypes.STRING(8),
        allowNull:false
    },
    ruc:{
        type:DataTypes.STRING(13)
    },
    direccion:{
        type:DataTypes.STRING(100)
    }
})
module.exports=Cliente;
