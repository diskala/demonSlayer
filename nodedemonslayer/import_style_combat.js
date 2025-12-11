const mongoose = require('mongoose');
const style_combatModel = require('./Model/styleCombatApi'); // adapte le chemin
const fs = require('fs');
require('dotenv').config();

const MONGO_URI = `mongodb+srv://diskala:Nafnaf!10000@cluster0.ygq5lqh.mongodb.net/demonSlayer?retryWrites=true&w=majority`; // depuis ton .env

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connexion MongoDB réussie'))
  .catch(err => console.error(err));

const importStyleDeCombats = async () => {
  try {
    // lecture du fichier json
    const dataStyleCombat = JSON.parse(fs.readFileSync('./data-style-combat - Copie.json', 'utf-8'));

    // insertion dans MongoDB
    const style_de_combat =  style_combatModel.insertMany(dataStyleCombat.content);
    await style_de_combat;

    console.log('les styles de combat ont été importés avec succès dans MongoDB 🎉');
    process.exit();
  } catch (err) {
    console.error('Erreur lors de l’import :', err);
    process.exit(1);
  }
};

importStyleDeCombats();
