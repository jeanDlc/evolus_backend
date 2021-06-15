const express=require('express');
const router=express.Router();
const projectController=require('../controllers/projectController');
const {body} = require('express-validator');
const {handlerValidationErrors} = require('../middlewares/handlerValidationErrors');

router.get('/', projectController.getProjects);

router.get('/:id', projectController.getProjectById);

router.post('/', 
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
    body('monto').trim().notEmpty().escape().withMessage('Monto no válido') ,
    handlerValidationErrors,
    projectController.newProject);

router.delete('/:id', projectController.deleteProject);

router.get('/:id/tareas', projectController.getProjectTasks);

router.post('/:id/tareas', 
    body('nombre').trim().notEmpty().escape().withMessage('Nombre no válido'),
    body('descripcion').trim().notEmpty().escape().isString().withMessage('Descripción no válida'),
    body('fecha_fin').isDate().withMessage('Fecha final no válida'),
    handlerValidationErrors,
    projectController.newProjectTask
);

module.exports=router;