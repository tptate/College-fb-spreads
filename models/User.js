const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please supply an email address'
  },
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true
  },
  isAdmin: {
    type: Boolean,
    ref: 'isAdmin',
    default: false
  },
  totalPoints: {
    type: Number,
    ref: 'TotalPoints',
    default: 0
  },
  totalWins: {
    type: Number,
    ref: 'TotalWins',
    default: 0
  },
  totalLosses: {
    type: Number,
    ref: 'TotalLosses',
    default: 0
  },
  preseasonPoints: {
    type: Number,
    ref: 'PreseasonPoints',
    default: 0
  },
  favTeam: {
    type: String,
    ref: 'FavTeam'
  },
  isBettor: {
    type: Boolean,
    ref: 'isBettor',
    default: false
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

userSchema.statics.getTopUsers = function() {
  return this.aggregate([
    { $sort: { totalPoints: -1, name: 1 } },
  ]);
};

userSchema.statics.getUsersAlphabetically = function() {
  return this.aggregate([
    { $sort: { name: 1 } },
  ]);
};

userSchema.statics.getPreseasonUsers = function() {
  return this.aggregate([
    { $sort: { preseasonPoints: -1, name: 1 } },
  ]);
};

userSchema.statics.findMissingPicks = function(week, users) {
  return this.aggregate([
    { $lookup: { from: 'picks', localField: '_id', foreignField: 'author', as: 'picks' } },
    // { $match: { 'picks[0].week': week }}
    // { $unwind: { path: '$users' }},
    // { $lookup: { from: 'picks', localField: '_id', foreignField: 'week', as: 'picks' } },
    // { $unwind: { path: '$picks' } },
  ])
};


userSchema.virtual('gravatar').get(function() {
  const hash = md5(this.email);
  return `https://gravatar.com/avatar/${hash}?s=200`;
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);