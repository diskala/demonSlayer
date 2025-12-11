const express = require("express");
const apiQuizModel = require("../Model/ApiQuiz");
const sessionQuizModel = require("../Model/SessionQuiz");

const sessionPostQuiz = async (req, res) => {
  try {
    const { codeSession } = req.params;
    
    const photo = req.file ? `http://localhost:3002/photoProfil/${req.file.filename}` : '';
    const { username, order, isValided } = req.body;

    if (!username || !photo || !order || !codeSession  ) {
      return res.status(400).json({ error: "Tous les champs sont requis", req:req.body, codeSession });
    }
   
    
    let session = await sessionQuizModel.findOne({ codeSession });

    
    
    if (!session) {
     session = new sessionQuizModel({
        codeSession:req.params.codeSession,
        participants: [{ username, photo, order, score: 0}],
        
        isValided:true,
        status: "ongoing",
        
      });
    
    } else {
      
      if(session.participants.length < 2){
          session.participants.push({ username, photo, order, score:0 });
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
  .populate("questions.textQuestionId"); // <- ça va récupérer tout l'objet apiQuiz


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
      .populate("questions.textQuestionId"); // facultatif si tu veux les détails de l'API Quiz

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

const PatchSessionQuiz = async (req, res)=>{
  try {
    const { codeSession } = req.params;
    const { textQuestionId, answers, participants} = req.body;

    if (!textQuestionId || !answers || !participants ) {
      return res.status(400).json({ error: "textQuestionId et answers sont requis" });
    }

    // Vérifier si la session existe
    const session = await sessionQuizModel.findOne({ codeSession });
    if (!session) {
      return res.status(404).json({ error: "Session non trouvée" });
    }

    // Ajouter la question et les réponses
    session.questions.push({
       
      textQuestionId,
      answers
    });

    participants.forEach(p => {
  const existing = session.participants.find(item => item.username === p.username);
  if (existing) {
    // Met à jour son score
    existing.score = p.score;
  } else {
    // Sinon, l’ajoute (au cas où nouveau participant)
    session.participants.push({ username: p.username, score: p.score });
  }
});

 // Changer le status si tout est enregistré
  session.status = "finished";

    await session.save();

    // Peupler les questions avec leurs détails de choiceQuiz
    const populatedSession = await sessionQuizModel.findOne({ codeSession })
      .populate("questions.textQuestionId");

    res.status(200).json({
      message: "Question ajoutée avec succès à la session",
      session: populatedSession
    });

  } catch (error) {
    console.error("Erreur PATCH sessionQuiz:", error);
    res.status(500).json({ error: "Erreur serveur", details: error.message });
  }

}

 


module.exports = { sessionPostQuiz, getParCodeSessionQuiz, PatchSessionQuiz };
