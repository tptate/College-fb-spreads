const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const gameSchema = new mongoose.Schema({
  home: {
    type: String,
    trim: true,
    required: 'Please enter a home team!'
  },
  away: {
    type: String,
    trim: true,
    required: 'Please enter an away team!'
  },
  spread: {
    type: Number,
    trim: true,
    required: 'Please enter spread for home team!'
  },
  gameDate: {
    type: Date,
    trim: true,
    required: 'Please enter game date!'
  },
  ref: {
    type: String,
    trim: true,
    required: 'Please enter a game+i reference!'
  },
  week: {
    type: mongoose.Schema.ObjectId,
    ref: 'Week',
    required: 'You must supply a week!'
  }
}, {
  toJSON: {virtuals: true },
  toObject: {virtuals: true }
});


module.exports = mongoose.model('Game', gameSchema);