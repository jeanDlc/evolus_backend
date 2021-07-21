const express = require("express");
const { body } = require("express-validator");
const employeeController = require("../controllers/employeeController");
const {
  handlerValidationErrors,
} = require("../middlewares/handlerValidationErrors");
const auth = require("../middlewares/auth");
const verifyAuthUser = require("../middlewares/verifyAuthUser");
const {
  adminPermission,
  validatePermissions,
  JefeTallerPermission,
  asesorPermission,
} = require("../middlewares/permissions");
const router = express.Router();
//obtener a todos los empleados
router.get(
  "/",
  auth,
  verifyAuthUser,
  adminPermission,
  asesorPermission,
  JefeTallerPermission,
  validatePermissions,
  employeeController.getEmployees
);
//get data de un empleado
router.get(
  "/:id",
  auth,
  verifyAuthUser,
  (req, res, next) => {
    //si es técnico automotriz, solo podrá ver su propio perfil
    if (req.user.RolId == 4 && req.params.id !== req.user.id) {
      return res.status(401).json({ error: "No tienes acceso" });
    }
    next();
  },
  employeeController.getEmployeeById
);
//crear un nuevo empleado/usuario
router.post(
  "/",
  auth,
  verifyAuthUser,
  adminPermission,
  validatePermissions,
  body("nombre").trim().notEmpty().escape().withMessage("Nombre no válido"),
  body("apellidos")
    .trim()
    .notEmpty()
    .escape()
    .withMessage("Appellidos no válidos"),
  body("num_telefonico")
    .trim()
    .notEmpty()
    .escape()
    .isLength({
      min: 9,
      max: 11,
    })
    .withMessage("Número telefónico no válido"),
  body("email").trim().escape().isEmail().withMessage("Correo no válido"),
  body("dni")
    .trim()
    .notEmpty()
    .escape()
    .isLength({ min: 8, max: 8 })
    .withMessage("DNI no válido"),
  body("ruc").trim().escape(),
  body("dirección").trim().escape(),
  body("pass")
    .trim()
    .notEmpty()
    .escape()
    .isLength({
      min: 6,
    })
    .withMessage("La contraseña debe tener mínimo 6 caracteres"),
  body("confirmar")
    .trim()
    .notEmpty()
    .escape()
    .custom((value, { req }) => {
      if (value !== req.body.pass) {
        throw new Error("Las contraseñas no coinciden");
      }
      return true;
    }),
  handlerValidationErrors,
  employeeController.newEmployee
);
//middleware local
const justAdminOrUserHimself = (req, res, next) => {
  //valida que el admin o el usuario autenticado pueda hacer un request sobre sí mismo
  //ejm: para editar un perfil
  if (req.user.id == req.params.id || req.user.RolId == 1) {
    return next();
  }
  return res.status(401).json({ error: "No cuentas con los permisos" });
};
//actualizar datos del empleado/usuario (excepto la contraseña)
router.put(
  "/:id",
  auth,
  verifyAuthUser,
  justAdminOrUserHimself,
  body("nombre").trim().notEmpty().escape().withMessage("Nombre no válido"),
  body("apellidos")
    .trim()
    .notEmpty()
    .escape()
    .withMessage("Appellidos no válidos"),
  body("num_telefonico")
    .trim()
    .notEmpty()
    .escape()
    .isLength({
      min: 9,
      max: 11,
    })
    .withMessage("Número telefónico no válido (solo 9 caracteres)"),
  body("dni")
    .trim()
    .notEmpty()
    .escape()
    .isLength({ min: 8, max: 8 })
    .withMessage("DNI no válido"),
  body("ruc").trim().escape(),
  body("dirección").trim().escape(),
  handlerValidationErrors,
  employeeController.updateEmployee
);
//cambiar la contraseña del empleado (usuario)
router.put(
  "/:id/cambiar-password",
  auth,
  verifyAuthUser,
  justAdminOrUserHimself,
  body("pass")
    .trim()
    .notEmpty()
    .escape()
    .withMessage("La contraseña actual no debe ir vacía"),
  body("newPass")
    .trim()
    .notEmpty()
    .escape()
    .isLength({
      min: 6,
    })
    .withMessage("La contraseña debe tener mínimo 6 caracteres"),
  body("confirmNewPass")
    .trim()
    .notEmpty()
    .escape()
    .withMessage("Confirmación no válida")
    .custom((value, { req }) => {
      if (value !== req.body.newPass) {
        throw new Error("La nueva contraseña y la confirmación no coinciden");
      }
      return true;
    }),
  handlerValidationErrors,
  employeeController.changePassword
);
//eliminar un empleado/usuario
router.delete(
  "/:id",
  auth,
  verifyAuthUser,
  adminPermission,
  validatePermissions,
  employeeController.deleteEmployee
);
module.exports = router;
