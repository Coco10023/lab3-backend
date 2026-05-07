require("dotenv").config();
console.log("MONGO_URI:", process.env.MONGO_URI);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Ansluten till MongoDB"))
  .catch(err => console.log(err));

  app.get("/", (req, res) => {
  res.json({ message: "API fungerar" });
});

app.listen(3000, () => {
  console.log("Servern körs på port 3000");
});

const Experience = require("./models/Experience");