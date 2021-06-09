const db=require('../config/db');
const Proyecto=require('./Proyecto');
const Empleado=require('./Empleado');
const Proyecto_Empleado = db.define('Proyecto_Empleado', {}, { timestamps: false });
Proyecto.belongsToMany(Empleado, { through: Proyecto_Empleado });
Empleado.belongsToMany(Proyecto, { through: Proyecto_Empleado });