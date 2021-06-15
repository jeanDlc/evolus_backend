const {Router}=require('express');
const router=Router();
const taskController=require('../controllers/taskController');
const {body}=require('express-validator');
const {handlerValidationErrors}=require('../middlewares/handlerValidationErrors');
///get one task
router.get('/:id', taskController.getTaskById )

router.delete('/:id', taskController.deleteTask);

router.put('/:id', 
    body('ProyectoId').trim().notEmpty().escape().withMessage('El id del proyecto es requerido'),
    body('nombre').trim().notEmpty().escape().withMessage('Nombre no válido'),
    body('descripcion').trim().notEmpty().escape().isString().withMessage('Descripción no válida'),
    body('fecha_fin').isDate().withMessage('Fecha final no válida'),
    handlerValidationErrors,
    taskController.updateTask
);
module.exports=router;