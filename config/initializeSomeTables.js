const Rol = require("../models/Rol");
const Empleado = require("../models/Empleado");
const { roles, firsTadmin } = require("./firtsTables.json");
exports.initializeSomeTables = async () => {
  try {
    //crear los primeros roles si no existen
    const num = await Rol.count();
    if (num == 0) {
      await Rol.bulkCreate(roles);
    }
    //crear el primer admin si es que no existe
    const numEmp = await Empleado.count();
    if (numEmp == 0) {
      const firstAdmin = await Empleado.create(firsTadmin);
      console.log("first admin", firstAdmin);
    }
  } catch (error) {
    console.log("error en initializeSomeTables", error.message || error);
  }
};
