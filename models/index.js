const mongoose = require('mongoose');

// Import all models
require('./Movie');
require('./Genre');
require('./Director');

module.exports = {
  Movie: mongoose.model('Movie'),
  Genre: mongoose.model('Genre'),
  Director: mongoose.model('Director')
}; 