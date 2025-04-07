const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  auteur: String,
  texte: String,
  date: Date,
});

const RecommendationSchema = new mongoose.Schema({
  type: String,
  titre: String,
  description: String,
  auteur: String,
  date: { type: Date, default: Date.now },
  commentaires: [CommentSchema],
});

module.exports = mongoose.model('Recommendation', RecommendationSchema);
