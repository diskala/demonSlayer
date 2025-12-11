const mongoose = require("mongoose");

const personnageSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true }, // identifiant unique
    name: { type: String, required: true }, // nom du personnage
    age: { type: String }, // âge
    gender: { type: String, enum: ["Masculin", "Féminin"] }, // genre
    race: { type: String }, // race (Humain, Démon, etc.)
    description: { type: String }, // description longue

    // Images
    img_1: { type: String },
    img_2: { type: String },
    img_3: { type: String },
    gif_1: { type: String },
    gif_2: { type: String },
    imgReel: { type: String },

    // Relations (affiliations, arcs, etc.)
    affiliation_id: { type: String }, // pourrait pointer vers une autre collection
    arc_id: { type: String },

    // Citation
    quote: { type: String },
  },
  {
    timestamps: true, // ajoute createdAt et updatedAt automatiquement
  }, 
  { 
    collection: "personnages" 
  }, // <-- le nom exact de ta collection MongoDB);
);

module.exports = mongoose.model("personnage", personnageSchema);
