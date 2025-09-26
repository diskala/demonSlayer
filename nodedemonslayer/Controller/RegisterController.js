const express = require("express");
const Users = require("../Model/user");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const dotenv = require("dotenv");
dotenv.config();
const registerPost = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  const existingUser = await Users.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "Email déjà utilisé" });
  }
  let user;
  const hash = await bcrypt.hash(req.body.password, 10);

  try {
    user = new Users({
      username: username,
      email: email,
      password: hash,
      role: req.body.role || "user",
    });
    res.status(201).json({ message: "User registered successfully", user });

    await user.save();
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error registering user", error: error.message });
  }
};
module.exports = { registerPost };
