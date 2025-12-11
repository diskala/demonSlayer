const express=require('express');
const router=express.Router();

const  {AllStyleDeCombat , StyleDeCombatParId}= require('../Controller/StyleCombatController');
 
router.get('/allStyleDeCombat', AllStyleDeCombat);
router.get('/styleDeCombat/:id', StyleDeCombatParId);
module.exports=router;