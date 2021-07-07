const {Router}=require('express');
const authController=require('../controllers/authController');
const {body}=require('express-validator')
const {handlerValidationErrors}=require('../middlewares/handlerValidationErrors');
const auth=require('../middlewares/auth');
const router=Router();
router.post('/',
    body('email').isEmail().withMessage('Email no válido'),
    body('pass').trim().notEmpty().withMessage('Ingresa tu contraseña'),
    handlerValidationErrors,
    authController.authenticateUser    
)
router.get('/',
    auth,
    authController.getAuthenticatedUser
)
module.exports=router;