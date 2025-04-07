const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Recommendation = require('./models/Recommendation');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection (à remplacer par ta propre URI)
mongoose.connect('mongodb+srv://alexandrebandeira007:mongoservertropcool@cluster0.rbbruxi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.get('/api/recommendations', async (req, res) => {
  const recos = await Recommendation.find();
  res.json(recos);
});

app.post('/api/recommendations', async (req, res) => {
  const newReco = new Recommendation(req.body);
  await newReco.save();
  res.json(newReco);
});

app.post('/api/recommendations/:id/comment', async (req, res) => {
  const { id } = req.params;
  const { auteur, texte } = req.body;
  const reco = await Recommendation.findById(id);
  reco.commentaires.push({ auteur, texte, date: new Date() });
  await reco.save();
  res.json(reco);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
