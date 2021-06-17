const express=require('express');
const rolController=require('../controllers/rolController');
const router=express.Router();

router.get('/', rolController.getRoles);

module.exports=router;