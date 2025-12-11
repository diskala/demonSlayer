const express=require('express');
const personnagesModel=require('../Model/PersonnagesSchema');
const styleCombatModel=require('../Model/styleCombatApi');

const AllStyleDeCombat = async (req, res)=>{

    try{

        const styleCombat = await styleCombatModel.find();

        if(!styleCombat){
            return res.status(400).json({error:"Probleme lors de la recupération des styles de combat"});

        }

        return res.status(200).json(styleCombat)

    }catch(error){
        return res.status(500).json({
      message: "Erreur lors de la recupération les styles de combat",
      error: error.message
    });
}
};

const StyleDeCombatParId= async (req, res)=>{
     try{

        const id= req.params.id;
        const getOneStyle= await styleCombatModel.findOne({id});
        if(!getOneCharecter){
             return res.status(400).json({error: "le style de combat demandé non disponible"});
        }

        return res.status(200).json(getOneStyle)
     }catch(error){

          return res.status(500).json({
      message: "Erreur lors de la recupération du personnage",
      error: error.message
    });

     }
    

    
}
module.exports= {
    AllStyleDeCombat , StyleDeCombatParId
} 