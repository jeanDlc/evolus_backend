const express=require('express');
const router=express.Router();

router.get('/', (req,res)=>{
    res.send('clientes get')
})
module.exports=router;