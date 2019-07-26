const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const weekSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter the week!'
  },
  slug: String
}, {
  toJSON: {virtuals: true },
  toObject: {virtuals: true }
});

weekSchema.pre('save', async function(next) {
  if (!this.isModified('name')) {
    next(); // skip it
    return; // stop this function from running
  }
  this.slug = slug(this.name);
  // find other stores that have a slug of wes, wes-1, wes-2
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const weeksWithSlug = await this.constructor.find({ slug: slugRegEx });
  // if(weeksWithSlug.length) {
  //   this.slug = `${this.slug}-${weeksWithSlug.length+1}`
  // }
  next();
});

// find games where the weeks _id property === games week property
weekSchema.virtual('games', {
  ref: 'Game', // what model to link?
  localField: '_id', // which field on the week?
  foreignField: 'week' // which field on the game?
});

function autopopulate(next) {
  this.populate('games');
  next();
};

weekSchema.virtual('picks', {
  ref: 'Pick', // what model to link?
  localField: '_id', // which field on the week?
  foreignField: 'week' // which field on the game?
});

function autopopulatePicks(next) {
  this.populate('picks');
  next();
};

weekSchema.virtual('winner', {
  ref: 'Winner', // what model to link?
  localField: '_id', // which field on the week?
  foreignField: 'week' // which field on the game?
});

function autopopulateWinner(next) {
  this.populate('winner');
  next();
};

weekSchema.pre('find', autopopulate);
weekSchema.pre('findOne', autopopulate);

weekSchema.pre('find', autopopulatePicks);
weekSchema.pre('findOne', autopopulatePicks);

weekSchema.pre('find', autopopulateWinner);
weekSchema.pre('findOne', autopopulateWinner);

module.exports = mongoose.model('Week', weekSchema);