const mongoose = require('mongoose');
const ApiQuiz = require('./Model/ApiQuiz'); // adapte le chemin
const fs = require('fs');
require('dotenv').config();

const MONGO_URI = `mongodb+srv://diskala:Nafnaf!10000@cluster0.ygq5lqh.mongodb.net/demonSlayer?retryWrites=true&w=majority`; // depuis ton .env

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connexion MongoDB réussie'))
  .catch(err => console.error(err));

const importQuiz = async () => {
  try {
    // lecture du fichier json
    const data = JSON.parse(fs.readFileSync('./demon_slayer_quiz_50.json', 'utf-8'));

    // insertion dans MongoDB
    const quiz =  ApiQuiz.insertMany(data);
    await quiz;

    console.log('Api Quiz importé avec succès dans MongoDB 🎉');
    process.exit();
  } catch (err) {
    console.error('Erreur lors de l’import :', err);
    process.exit(1);
  }
};

importQuiz();
