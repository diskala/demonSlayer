const express = require("express");
const apiQuizModel = require("../Model/ApiQuiz");
const choiceQuizModel = require('../Model/ChoiceQuizBySession');
const sessionQuizModel =require('../Model/SessionQuiz');



const ApiQuizPost = async (req, res) => {
  try {
    const { codeSession } = req.body;

    if (!codeSession) {
      return res.status(400).json({ error: "Le code session n'a pas été envoyé" });
    }

    // recupération la session Quiz par code session si disponible
    const sessionQuizParCode = await sessionQuizModel.findOne({codeSession});

    if (!sessionQuizParCode) {
  return res.status(404).json({ error: "Aucune session de Quiz trouvée" });
}

// si la session existe mais déjà pleine (par ex : 2 participants max)
if (!sessionQuizParCode.participants || sessionQuizParCode.participants.length !== 2) {
  return res.status(400).json({ error: "Il faut deux participants pour commencer le Quiz !" });
}

    // Vérifier si une sélection existe déjà pour ce codeSession
    let existingSelection = await choiceQuizModel
      .findOne({ codeSession })
      .populate("quizsSelectedId");

    if (existingSelection) {
      return res.status(200).json({
        message: "Sélection déjà existante pour ce code session",
        quizs: existingSelection.quizsSelectedId
      });
    }

    // Récupérer tous les quiz
    // const lesQuizs = await apiQuizModel.findOne();
     // Requête MongoDB avec l’opérateur $ne (not equal)
    // Récupérer tous les quiz sauf ceux de difficulté "facile" et "moyen"
const lesQuizs = await apiQuizModel.find({
  difficulty: { $nin: ["facile", "moyen"] }
});
    if (!lesQuizs || lesQuizs.length === 0) {
      return res.status(404).json({ error: "Aucun quiz trouvé" });
    }

    // Prendre 4 quiz aléatoires
    const selectionQuatreQuiz = lesQuizs.sort(() => 0.5 - Math.random()).slice(0, 8);

    // Créer et sauvegarder la sélection
    const newSelection = new choiceQuizModel({
      codeSession,
      quizsSelectedId: selectionQuatreQuiz.map(q => q._id) // pas de tableau dans un tableau
    });

    await newSelection.save();

    return res.status(200).json({
      message: "Nouvelle sélection enregistrée",
      quizs: selectionQuatreQuiz
    });

  } catch (error) {
    console.error("Erreur backend:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};






const ApiQuizGet = async (req, res) => {
   
  try {
    const { codeSession } = req.params;

    if(!codeSession){
       return res.status(400).json({ error: "le code session n'a pas été envoyé" });
    }
    // ATTENTION : il faut await pour récupérer les données
    const lesQuizs = await choiceQuizModel.findOne({codeSession}).populate("quizsSelectedId");;

    if (!lesQuizs || lesQuizs.length === 0) {
      return res.status(404).json({ error: "Aucune selection quiz trouvé", lesQuizs });
    }
  
 


    return res.status(200).json({
      message: "Récupération du tableau Quiz réussie",
      lesQuizs ,
    });
  } catch (error) {
    console.error("Erreur backend:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};

module.exports = {
  ApiQuizGet, ApiQuizPost
};
