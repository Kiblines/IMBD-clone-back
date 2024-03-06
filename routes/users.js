const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.use((req, res, next) => {
  console.log(req.method);
  next();
});
//Route inscription
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    console.log(user), "coucou user1";
    await user.save();
    console.log(user), "coucou user post save";
    res.status(201).send("Utilisateur crée !");
  } catch (error) {
    res.status(500).send("Erreur lors de la création de l'utilisateur");
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    // Chercher l'utilisateur par son nom d'utilisateur
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).send("Utilisateur non trouvé");
    }

    // Vérifier le mot de passe
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).send("Mot de passe incorrect");
    }

    // Ici, tu peux ajouter la logique pour créer un token JWT si tu le souhaites

    res.send("Connexion réussie");
  } catch (error) {
    res.status(500).send("Erreur lors de la connexion");
  }
});

module.exports = router;
