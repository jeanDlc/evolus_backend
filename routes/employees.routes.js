const express=require('express');
const router=express.Router();

router.get('/', (req,res)=>{
    res.send('employees get')
})
module.exports=router;