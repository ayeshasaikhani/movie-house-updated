const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre',
    required: true,
  },
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Director',
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Movie || mongoose.model('Movie', movieSchema); 