const { DataTypes} = require('sequelize');
const db=require('../config/db');
const Rol= require('./Rol');
const Proyecto = require('./Proyecto');
const bcrypt=require('bcrypt');
const Empleado=db.define('Empleado',{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV1
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
        type:DataTypes.STRING(11),
        allowNull:false,
        unique:true
    },
    email:{
        type:DataTypes.STRING(40),
        allowNull:false,
        validate:{isEmail:{
            msg:'Email no válido'
        }},
        unique:true
    },
    dni:{
        type:DataTypes.STRING(8),
        allowNull:false,
        unique:true
    },
    ruc:{
        type:DataTypes.STRING(13),
        unique:true
    },
    direccion:{
        type:DataTypes.STRING(100)
    },
    pass:{
        type:DataTypes.STRING(60),
        allowNull:false
    },
    activo:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    token:{
        type:DataTypes.STRING
    },
    expiraToken:{
        type:DataTypes.DATE
    }
},{hooks:{
    beforeCreate(empleado){
        empleado.pass=bcrypt.hashSync(empleado.pass, bcrypt.genSaltSync(10));
    }
}})

//custom methods
Empleado.prototype.verifyPassword=function(pass){
    return bcrypt.compareSync(pass,this.pass);
}

Empleado.belongsTo(Rol);

module.exports=Empleado;
