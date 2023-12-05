const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);
app.use((req, res, next) => {
  console.log("coucou je suis pas un tocard");
  console.log(req.method);
  console.log(req.originalUrl);
  console.log(req.body);
  console.log(req.query);

  next();
});

const mongoDBUri = "mongodb://127.0.0.1:27017/IMBD";

mongoose
  .connect(mongoDBUri)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.error("Connexion à MongoDB échouée !", error));
console.log("coucou 23");

// Démarrer le serveur
const port = 3000; //middleware qui log
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
app.get("/", (req, res) => {
  res.send("Bienvenue sur mon API de films IMDB test!");
  console.log("coucou ici ");
});
