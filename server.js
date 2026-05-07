require("dotenv").config();
console.log("MONGO_URI:", process.env.MONGO_URI);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Experience = require("./models/Experience");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());


// Anslut till MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Ansluten till MongoDB"))
  .catch(err => console.log(err));

  // Test Route
  app.get("/", (req, res) => {
  res.json({ message: "API fungerar" });
});

// När någon går till: /api/experiences så körs koden: const experiences = await Experience.find();
app.get("/api/experiences", async (req, res) => { // Get - hämtar alla arbetserfarenheter
  try {
    const experiences = await Experience.find();
    res.json(experiences); // Skickar tillbaka datan som JSON
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - hämta en specifik arbetserfarenhet
app.get("/api/experiences/:id", async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ message: "Posten hittades inte" });
    }

    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte hämta posten" });
  }
});

app.listen(3000, () => {
  console.log("Servern körs på port 3000");
});

