const express=require('express');
const { body } = require('express-validator');
const employeeController=require('../controllers/employeeController');
const {handlerValidationErrors}=require('../middlewares/handlerValidationErrors');
const auth=require('../middlewares/auth');
const verifyAuthUser=require('../middlewares/verifyAuthUser');
const {adminPermission,validatePermissions, JefeTallerPermission,asesorPermission }=require('../middlewares/permissions');
const router=express.Router();

router.get('/', 
    auth,
    verifyAuthUser,
    adminPermission,
    asesorPermission,
    JefeTallerPermission,
    validatePermissions,
    employeeController.getEmployees);

router.get('/:id', 
    auth,
    verifyAuthUser,
    (req,res,next)=>{
        //si es técnico automotriz, solo podrá ver su propio perfil
        if(req.user.RolId==4 && req.params.id!==req.user.id){
            return res.status(401).json({error:'No tienes acceso'});
        }
        next(); 
    },
    employeeController.getEmployeeById);

router.post('/', 
    auth,
    verifyAuthUser,
    adminPermission,
    validatePermissions,
    body('nombre').trim().notEmpty().escape().withMessage('Nombre no válido'),
    body('apellidos').trim().notEmpty().escape().withMessage('Appellidos no válidos'),
    body('num_telefonico').trim().notEmpty().escape().isLength({
        min:9,max:11,
    }).withMessage('Número telefónico no válido'),
    body('email').trim().escape().isEmail().withMessage('Correo no válido'),
    body('dni').trim().notEmpty().escape().isLength({min:8, max:8}).withMessage('DNI no válido'),
    body('ruc').trim().escape(),
    body('dirección').trim().escape(),
    body('pass').trim().notEmpty().escape().isLength({
        min:6
    }).withMessage('La contraseña debe tener mínimo 6 caracteres'),
    body('confirmar').trim().notEmpty().escape().custom((value, {req})=>{
        if (value !== req.body.pass) {
            throw new Error('La contraseña y el password no coinciden');
        }
        return true;
    }),
    handlerValidationErrors,
    employeeController.newEmployee
);

router.put('/:id', 
    auth,
    verifyAuthUser,
    (req,res,next)=>{
        //solo el mismo user o el admin pueden editar el perfil del empleado
        if(req.user.id==req.params.id || req.user.RolId==1){
            return next();
        }
        return res.status(401).json({error:'No puedes editar este perfil'});
    },
    body('nombre').trim().notEmpty().escape().withMessage('Nombre no válido'),
    body('apellidos').trim().notEmpty().escape().withMessage('Appellidos no válidos'),
    body('num_telefonico').trim().notEmpty().escape().isLength({
        min:9,max:11,
    }).withMessage('Número telefónico no válido (solo 9 caracteres)'),
    body('dni').trim().notEmpty().escape().isLength({min:8, max:8}).withMessage('DNI no válido'),
    body('ruc').trim().escape(),
    body('dirección').trim().escape(),
    body('pass').trim().notEmpty().escape().isLength({
        min:6
    }).withMessage('La contraseña debe tener mínimo 6 caracteres'),
    body('confirmar').trim().notEmpty().escape().custom((value, {req})=>{
        if (value !== req.body.pass) {
            throw new Error('La contraseña y el password no coinciden');
        }
        return true;
    }),
    handlerValidationErrors,
    employeeController.updateEmployee
)

router.delete('/:id', 
    auth,
    verifyAuthUser,
    adminPermission,
    validatePermissions,
    employeeController.deleteEmployee)
module.exports=router;