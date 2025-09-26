const express = require("express");
const participantModel = require("../Model/Partricipant");

const createParticipant = async (req, res) => {
  try {
      
    const photo = req.file ? `http://localhost:3002/photoProfil/${req.file.filename}` : '';
    const { username, order, codeSessions } = req.body;

    if (!username || !photo || !order || !codeSessions) {
      return res.status(400).json({ error: "Tous les champs sont requis"  });
    }

   // Vérifier si le participant existe déjà
   // Vérifier si une session de participants existe déjà
    let existingParticipant = await participantModel.findOne({ codeSessions });

    if (!existingParticipant) {
      // Créer une nouvelle "session" avec le premier participant
      existingParticipant = new participantModel({
        codeSessions,
        participantId: [{ username, photo, order }],
        status: "waiting"
      });
    } else {
      // Ajouter un participant à la session existante
      existingParticipant.participantId.push({ username, photo, order });
    }

    if (existingParticipant.participantId.length >= 2) {
      return res.status(400).json({ error: "Nombre maximum de participants atteint" });
    }

    // Sauvegarder la session mise à jour ou nouvellement créée
    await existingParticipant.save();
    
      return res.status(201).json({
        message: "Participant ajouté avec succès",
        existingParticipant
      });
    
     
    
  } catch (error) {
    return res.status(500).json({
      message: "Erreur lors de la création du participant",
      error: error.message
    });
  }
};


const getAllParticipants = async (req, res) => {
  try {
    const participants = await participantModel.find();
    return res.status(200).json(participants);
  } catch (error) {
    return res.status(500).json({
      message: "Erreur lors de la récupération des participants",
        error: error.message
    });
  }
};

ParticipantByUsername = async (req, res) => {
    try {
        const { codeSessions } = req.params;
        const participantParUsermame = await participantModel.find
        ({ codeSession: codeSession });
        if (!participantParUsermame) {
            return res.status(404).json({ error: "Participant non trouvé" });
        }
        return res.status(200).json(participantParUsermame);
    } catch (error) {
        return res.status(500).json({
            message: "Erreur lors de la récupération du participant",
            error: error.message
        });
    }
};

module.exports = { createParticipant, getAllParticipants, ParticipantByUsername };
