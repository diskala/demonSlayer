const express = require('express');
const personnagesModel = require('../Model/PersonnagesSchema');

const AllPersonnages = async (req, res) => {
  try {
    const personnages = await personnagesModel.find();
    if (personnages.length === 0) {
      return res.status(400).json({ error: "Aucun personnage trouvé" });
    }
    return res.status(200).json(personnages);
  } catch (error) {
    return res.status(500).json({
      message: "Erreur lors de la récupération des personnages",
      error: error.message
    });
  }
};

const PersonnageParId = async (req, res) => {
  try {
    
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "ID invalide" });
    }

    const getOneCharacter = await personnagesModel.findOne({ id: Number(id) });
    if (!getOneCharacter) {
      return res.status(404).json({ error: "Le personnage demandé n'est pas disponible" });
    }
    return res.status(200).json(getOneCharacter);
  } catch (error) {
    return res.status(500).json({
      message: "Erreur lors de la récupération du personnage",
      error: error.message
    });
  }
};

module.exports = { AllPersonnages, PersonnageParId };
