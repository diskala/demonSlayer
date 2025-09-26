const express = require("express");
const apiQuizModel = require("../Model/ApiQuiz");
const sessionQuizModel = require("../Model/SessionQuiz");

const sessionPostQuiz = async (req, res) => {
  try {
    const { codeSession } = req.params;
    
    const photo = req.file ? `http://localhost:3002/photoProfil/${req.file.filename}` : '';
    const { username, order, selectedChoice, score, isCorrect, apiQuizId } = req.body;

    if (!username || !photo || !order || !codeSession) {
      return res.status(400).json({ error: "Tous les champs sont requis", req:req.body, codeSession });
    }
    const scoreNum = parseInt(score) || 0;
    let session = await sessionQuizModel.findOne({ codeSession });

    
    
    if (!session) {
     session = new sessionQuizModel({
        codeSession:req.params.codeSession,
        participants: [{ username, photo, order }],
        questions: [{
          apiQuizId,
          answers: [{ username, selectedChoice, isCorrect, score: scoreNum }]
        }],
        status: "waiting",
        
      });
    
    } else {
      
      if(session.participants.length < 2){
          session.participants.push({ username, photo, order });
      }else if(session.participants.length >= 2){
             return res.status(400).json({ error: "Nombre maximum de participants atteint" });
      }else{
        return res.status(400).json({ error: "un probleme est servenu lors du chargement les participants"});
      }
     

      

    }
     
     
    await session.save();
// Puis on récupère la session en "peuplant" apiQuizId
   const populatedSession = await sessionQuizModel
  .findOne({ codeSession })
  .populate("questions.apiQuizId"); // <- ça va récupérer tout l'objet apiQuiz


    return res.status(201).json({ message: "Participant ajouté à la session avec succès", populatedSession  });

  } catch (error) {
  console.error("Erreur backend :", error);
  return res.status(500).json({ message: "Erreur lors de l'ajout du participant", error: error.message });
}
};

const getParCodeSessionQuiz = async (req, res) => {
  const { codeSession } = req.params;

  try {
    // On attend la promesse avec await
    const sessionQuizParCode = await sessionQuizModel
      .findOne({ codeSession })
      .populate("questions.apiQuizId"); // facultatif si tu veux les détails de l'API Quiz

    if (!sessionQuizParCode) {
      return res.status(404).json({ message: "Session non trouvée" });
    }

    return res.status(200).json(sessionQuizParCode);
  } catch (error) {
    console.error("Erreur backend:", error);
    return res.status(500).json({
      message: "Erreur lors de la récupération des participants",
      error: error.message
    });
  }
};



module.exports = { sessionPostQuiz, getParCodeSessionQuiz };
