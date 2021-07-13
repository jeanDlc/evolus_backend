const express=require('express');
const router=express.Router();
const clientController=require('../controllers/clientController');
const { body } = require('express-validator');
const auth=require('../middlewares/auth');
const verifyAuthUser=require('../middlewares/verifyAuthUser');
const permission=require('../middlewares/permissions');
router.get('/', 
    auth,
    verifyAuthUser,
    permission.adminPermission,
    permission.asesorPermission,
    permission.JefeTallerPermission,
    permission.validatePermissions,
    clientController.getClients );

router.get('/:id', 
    auth,
    verifyAuthUser,
    permission.adminPermission,
    permission.asesorPermission,
    permission.JefeTallerPermission,
    permission.validatePermissions,
    clientController.getClientById);

router.post('/',
    auth,
    verifyAuthUser,
    permission.adminPermission,
    permission.asesorPermission,
    permission.validatePermissions,
    body('nombre').trim().notEmpty().escape().withMessage('Nombre no válido'),
    body('apellidos').trim().notEmpty().escape().withMessage('Appellidos no válidos'),
    body('num_telefonico').trim().notEmpty().escape().isLength({
        max:11, min:9
    }).withMessage('Número telefónico no válido'),
    body('email').trim().escape().isEmail().withMessage('Correo no válido'),
    body('dni').trim().notEmpty().escape().isLength({min:8, max:8}).withMessage('DNI no válido'),
    body('ruc').trim().escape(),
    body('dirección').trim().escape(),
    clientController.handlerValidationErrors,
    clientController.newClient
);

router.put('/:id',
    auth,
    verifyAuthUser,
    permission.adminPermission,
    permission.asesorPermission,
    permission.validatePermissions,
    body('nombre').trim().notEmpty().escape().withMessage('Nombre no válido'),
    body('apellidos').trim().notEmpty().escape().withMessage('Appellidos no válidos'),
    body('num_telefonico').trim().notEmpty().escape().isLength({
        max:11, min:9
    }).withMessage('Número telefónico no válido'),
    body('email').trim().escape().isEmail().withMessage('Correo no válido'),
    body('dni').trim().notEmpty().escape().isLength({min:8, max:8}).withMessage('DNI no válido'),
    body('ruc').trim().escape(),
    body('dirección').trim().escape(),
    clientController.handlerValidationErrors,
    clientController.updateClientById
);


router.delete('/:id', 
    auth,
    verifyAuthUser,
    permission.adminPermission,
    permission.asesorPermission,
    permission.validatePermissions,
    clientController.deleteClientById);

module.exports=router;