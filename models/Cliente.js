const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Cliente = db.define("Cliente", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV1,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  apellidos: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  num_telefonico: {
    type: DataTypes.STRING(11),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(40),
    allowNull: false,
    validate: {
      isEmail: {
        msg: "Email no válido",
      },
    },
    unique: true,
  },
  dni: {
    type: DataTypes.STRING(8),
    allowNull: false,
    unique: true,
  },
  ruc: {
    type: DataTypes.STRING(13),
    unique: true,
  },
  direccion: {
    type: DataTypes.STRING(100),
  },
});
module.exports = Cliente;
