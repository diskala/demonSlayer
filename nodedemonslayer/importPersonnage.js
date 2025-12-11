const mongoose = require('mongoose');
const PersonnagesModel = require('./Model/PersonnagesSchema'); // adapte le chemin
const fs = require('fs');
require('dotenv').config();

const MONGO_URI = `mongodb+srv://diskala:Nafnaf!10000@cluster0.ygq5lqh.mongodb.net/demonSlayer?retryWrites=true&w=majority`; // depuis ton .env

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connexion MongoDB réussie'))
  .catch(err => console.error(err));

const importPersonnages = async () => {
  try {
    // lecture du fichier json
    const dataPersonnage = JSON.parse(fs.readFileSync('./data-personages - Copie.json', 'utf-8'));

    // insertion dans MongoDB
    const personnage =  PersonnagesModel.insertMany(dataPersonnage.content);
    await personnage;

    console.log('tous les personnages importés avec succès dans MongoDB 🎉');
    process.exit();
  } catch (err) {
    console.error('Erreur lors de l’import :', err);
    process.exit(1);
  }
};

importPersonnages();
