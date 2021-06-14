const express=require('express');
const { body } = require('express-validator');
const employeeController=require('../controllers/employeeController');
const {handlerValidationErrors}=require('../middlewares/handlerValidationErrors');
const router=express.Router();

router.get('/', employeeController.getEmployees);

router.get('/:id', employeeController.getEmployeeById);

router.post('/', 

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
    handlerValidationErrors,
    employeeController.newEmployee);

module.exports=router;