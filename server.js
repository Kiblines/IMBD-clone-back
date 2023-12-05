const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");

const app = express();

app.use(express.json());

const mongoDBUri = "mongodb://localhost:27017/IMBD";

mongoose
  .connect(mongoDBUri)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.error("Connexion à MongoDB échouée !", error));

// Démarrer le serveur
const port = 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
app.get("/", (req, res) => {
  res.send("Bienvenue sur mon API de films IMDB!");
});

app.use("api/users", userRoutes);
