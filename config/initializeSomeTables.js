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
    await Empleado.create(firsTadmin);
  } catch (error) {
    console.log(error);
  }
};
