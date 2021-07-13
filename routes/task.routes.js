const {Router}=require('express');
const router=Router();
const taskController=require('../controllers/taskController');
const {body}=require('express-validator');
const {handlerValidationErrors}=require('../middlewares/handlerValidationErrors');
const auth=require('../middlewares/auth');
const verifyAuthUser=require('../middlewares/verifyAuthUser');
const {adminPermission,validatePermissions, JefeTallerPermission }=require('../middlewares/permissions');
///get one task
router.get('/:id', 
    auth,
    verifyAuthUser,
    taskController.getTaskById )

router.delete('/:id', 
    auth,
    verifyAuthUser,
    adminPermission,
    JefeTallerPermission,
    validatePermissions,
    taskController.deleteTask);

router.put('/:id', 
    auth,
    verifyAuthUser,
    adminPermission,
    JefeTallerPermission,
    validatePermissions,
    body('ProyectoId').trim().notEmpty().escape().withMessage('El id del proyecto es requerido'),
    body('nombre').trim().notEmpty().escape().withMessage('Nombre no válido'),
    body('descripcion').trim().notEmpty().escape().isString().withMessage('Descripción no válida'),
    body('estado').isBoolean().withMessage('Estado no válido'),
    handlerValidationErrors,
    taskController.updateTask
);
module.exports=router;