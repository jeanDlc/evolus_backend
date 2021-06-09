const {validationResult}=require('express-validator');

exports.handlerValidationErrors=(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }else{
        return next();
    }
}