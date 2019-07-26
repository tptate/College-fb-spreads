const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const preseasonSchema = new mongoose.Schema({
  ACCa: {
    type: String,
    ref: 'ACCa',
  },
  ACCaPoints: {
    type: Number,
    ref: 'ACCaPoints'
  },
  ACCc: {
    type: String,
    ref: 'ACCc',
  },
  ACCcPoints: {
    type: Number,
    ref: 'ACCcPoints'
  },
  ACC: {
    type: String,
    ref: 'ACC',
  },
  ACCPoints: {
    type: Number,
    ref: 'ACCPoints'
  },
  SECe: {
    type: String,
    ref: 'SECe',
  },
  SECePoints: {
    type: Number,
    ref: 'SECePoints'
  },
  SECw: {
    type: String,
    ref: 'SECw',
  },
  SECwPoints: {
    type: Number,
    ref: 'SECwPoints'
  },
  SEC: {
    type: String,
    ref: 'SEC',
  },
  SECPoints: {
    type: Number,
    ref: 'SECPoints'
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author!'
  },
}, {
  toJSON: {virtuals: true },
  toObject: {virtuals: true }
});

module.exports = mongoose.model('Preseason', preseasonSchema);