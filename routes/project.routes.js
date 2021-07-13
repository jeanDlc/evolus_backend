const express=require('express');
const router=express.Router();
const projectController=require('../controllers/projectController');
const {body} = require('express-validator');
const {handlerValidationErrors} = require('../middlewares/handlerValidationErrors');
const auth=require('../middlewares/auth');
const verifyAuthUser=require('../middlewares/verifyAuthUser');
const {adminPermission,validatePermissions, JefeTallerPermission,asesorPermission }=require('../middlewares/permissions');
router.get('/', 
    auth,
    verifyAuthUser,
    projectController.getProjects);

router.get('/:id', 
    auth,
    verifyAuthUser,
    projectController.getProjectById);

router.post('/', 
    auth,
    verifyAuthUser,
    adminPermission,
    asesorPermission,
    validatePermissions,
    body('ClienteId').trim().notEmpty().escape().withMessage('Cliente no válido') ,
    body('nombre').trim().notEmpty().escape().withMessage('Nombre no válido') ,
    body('descripcion').trim().notEmpty().escape().withMessage('Descripción no válida') ,
    body('fecha_inicio').isDate().withMessage('Fecha de inicio no válida') ,
    body('fecha_fin').isDate().withMessage('Fecha final no válida').custom((value,{req})=>{
        if(value<req.body.fecha_inicio){
            throw new Error('La fecha final no debe ser antes de la fecha inicial');
        }
        return true;
    }),
    body('num_matricula').trim().notEmpty().escape().isLength({max:7}).withMessage('Matrícula no válida') ,
    body('monto').isNumeric().withMessage('Monto no válido') ,
    body('empleados').isArray({min:1}).withMessage('Elige al menos un empleado'),
    handlerValidationErrors,
    projectController.newProject);

router.put('/:id', 
    auth,
    verifyAuthUser,
    adminPermission,
    JefeTallerPermission,
    validatePermissions,
    body('ClienteId').trim().notEmpty().escape().withMessage('Cliente no válido') ,
    body('nombre').trim().notEmpty().escape().withMessage('Nombre no válido') ,
    body('descripcion').trim().notEmpty().escape().withMessage('Descripción no válida') ,
    body('fecha_inicio').isDate().withMessage('Fecha de inicio no válida') ,
    body('fecha_fin').isDate().withMessage('Fecha final no válida').custom((value,{req})=>{
        if(value<req.body.fecha_inicio){
            throw new Error('La fecha final no debe ser antes de la fecha inicial');
        }
        return true;
    }),
    body('num_matricula').trim().notEmpty().escape().isLength({max:7}).withMessage('Matrícula no válida') ,
    body('monto').isNumeric().withMessage('Monto no válido') ,
    body('empleados').isArray({min:1}).withMessage('Elige al menos un empleado'),
    handlerValidationErrors,
    projectController.updateProject);

router.delete('/:id', 
    auth,
    verifyAuthUser,
    adminPermission,
    JefeTallerPermission,
    validatePermissions,
    projectController.deleteProject);

router.get('/:id/tareas', 
    auth,
    verifyAuthUser,
    projectController.getProjectTasks);

router.post('/:id/tareas', 
    auth,
    verifyAuthUser,
    adminPermission,
    JefeTallerPermission,
    body('nombre').trim().notEmpty().escape().withMessage('Nombre no válido'),
    body('descripcion').trim().notEmpty().escape().withMessage('Descripción no válida'),
    handlerValidationErrors,
    projectController.newProjectTask
);

module.exports=router;