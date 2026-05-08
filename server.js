require("dotenv").config();
console.log("MONGO_URI:", process.env.MONGO_URI);

// Importerar nödvändiga paket
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Experience = require("./models/Experience");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Middleware som tillåter cross-origin requests (frontend kan prata med API)
app.use(express.json()); // Middleware som gör att vi kan läsa JSON i request body


// Ansluter till MongoDB via Mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Ansluten till MongoDB"))
  .catch(err => console.log(err));

  // Test-route för att kontrollera att API fungerar
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


// POST - skapa ny arbetserfarenhet
app.post("/api/experiences", async (req, res) => {

  // Hämtar data från request body
  const { company, role, location, startDate, description } = req.body; 

  // Validering – kontrollerar att obligatoriska fält finns
  if (!company || !role || !location || !startDate || !description) {
    return res.status(400).json({
      message: "Company, role, location, startDate och description måste fyllas i."
    });
  }

  try {
    // Skapar nytt objekt i databasen
    const newExperience = new Experience({
      company,
      role,
      location,
      startDate,
      endDate: req.body.endDate,
      description
    });

    // Sparar till MongoDB
    const savedExperience = await newExperience.save();
    res.status(201).json(savedExperience);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte skapa posten" });
  }
});

// Uppdaterar en befintlig arbetserfarenhet baserat på ID
app.put("/api/experiences/:id", async (req, res) => {
  const { company, role, location, startDate, description } = req.body;

  if (!company || !role || !location || !startDate || !description) {
    return res.status(400).json({
      message: "Company, role, location, startDate och description måste fyllas i."
    });
  }

  try {
    const updatedExperience = await Experience.findByIdAndUpdate(
      req.params.id,
      {
        company,
        role,
        location,
        startDate,
        endDate: req.body.endDate,
        description
      },
      { new: true }
    );

    if (!updatedExperience) {
      return res.status(404).json({ message: "Posten hittades inte" });
    }

    res.json(updatedExperience);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte uppdatera posten" });
  }
});

// Raderar en arbetserfarenhet baserat på ID
app.delete("/api/experiences/:id", async (req, res) => {
  try {
    const deletedExperience = await Experience.findByIdAndDelete(req.params.id);

    if (!deletedExperience) {
      return res.status(404).json({ message: "Posten hittades inte" });
    }

    res.json({ message: "Posten har raderats" });
  } catch (error) {
    res.status(500).json({ message: "Kunde inte radera posten" });
  }
});

// Startar servern på angiven port
app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
