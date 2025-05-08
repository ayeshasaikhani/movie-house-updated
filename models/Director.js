const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  birthYear: {
    type: Number,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  movies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Director || mongoose.model('Director', directorSchema); 