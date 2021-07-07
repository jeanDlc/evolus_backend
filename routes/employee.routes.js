const express=require('express');
const { body } = require('express-validator');
const employeeController=require('../controllers/employeeController');
const {handlerValidationErrors}=require('../middlewares/handlerValidationErrors');
const auth=require('../middlewares/auth');
const verifyAuthUser=require('../middlewares/verifyAuthUser');
const router=express.Router();

router.get('/', 
    auth,
    verifyAuthUser,
    employeeController.getEmployees);

router.get('/:id', 
    auth,
    verifyAuthUser,
    employeeController.getEmployeeById);

router.post('/', 
    auth,
    verifyAuthUser,
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
    employeeController.deleteEmployee)
module.exports=router;