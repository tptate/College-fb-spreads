const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const winnerSchema = new mongoose.Schema({
  game1: {
    type: String,
    ref: 'Game1',
  },
  game2: {
    type: String,
    ref: 'Game2',
  },
  game3: {
    type: String,
    ref: 'Game3',
  },
  game4: {
    type: String,
    ref: 'Game4',
  },
  game5: {
    type: String,
    ref: 'Game5',
  },
  game6: {
    type: String,
    ref: 'Game6',
  },
  game7: {
    type: String,
    ref: 'Game7',
  },
  game8: {
    type: String,
    ref: 'Game8',
  },
  game9: {
    type: String,
    ref: 'Game9',
  },
  game10: {
    type: String,
    ref: 'Game10',
  },
  game11: {
    type: String,
    ref: 'Game11',
  },
  game12: {
    type: String,
    ref: 'Game12',
  },
  game13: {
    type: String,
    ref: 'Game13',
  },
  game14: {
    type: String,
    ref: 'Game14',
  },
  game15: {
    type: String,
    ref: 'Game15',
  },
  game16: {
    type: String,
    ref: 'Game16',
  },
  game17: {
    type: String,
    ref: 'Game17',
  },
  game18: {
    type: String,
    ref: 'Game18',
  },
  game19: {
    type: String,
    ref: 'Game19',
  },
  game20: {
    type: String,
    ref: 'Game20',
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

module.exports = mongoose.model('Winner', winnerSchema);