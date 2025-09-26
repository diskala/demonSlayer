const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://diskala:Nafnaf!10000@cluster0.ygq5lqh.mongodb.net/demonSlayer?retryWrites=true&w=majority`, {
    
  });

  console.log('Connexion à MongoDB Atlas réussie');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
module.exports = connectDB;