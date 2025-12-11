const express=require('express');
const router=express.Router();

const  {AllPersonnages, PersonnageParId}= require('../Controller/PersonnagesController');
 
router.get('/allCharecters', AllPersonnages);
router.get('/characterById/:id', PersonnageParId);
module.exports=router;