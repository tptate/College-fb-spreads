const mongoose = require('mongoose');
const Week = mongoose.model('Week');
const User = mongoose.model('User');
const Preseason = mongoose.model('Preseason');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

exports.getPreseason = async (req, res) => {
  const users = await User.find();
  const preseasons = await Preseason.find();
  res.render('preseason', { title: `Preseason picks `, users, preseasons});
};

exports.addPreseason = async (req, res) => {
  req.body.week = req.params.id;
  req.body.author = req.user._id;
  const newPreseason = new Preseason(req.body);
  await newPreseason.save();
  req.flash('success', 'Preseason picks saved!');
  res.redirect('back');
};

const confirmOwner = (preseason, user) => {
  if (!preseason.author.equals(user._id)) {
    throw Error('You must own a store in order to edit it!');
  }
};

exports.editPreseason = async (req, res) => {
  // 1. Find the preseason given the ID
  const preseason = await Preseason.findOne({ _id: req.params.id });
  // res.json(preseason)
  // 2. Confirm they are the owner of the store
  confirmOwner(preseason, req.user);
  // // 3. Render out the edit form so the user can update
  res.render('preseason', { title: `Edit Preseason Picks`, preseason, editPicks: true, preseasonId: `/${req.params.id}` });
};

exports.updatePreseason = async (req, res) => {
  // find and update the picks
  const preseason = await Preseason.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new picks instead of the old ones
    runValidators: true
  }).exec();
  req.flash('success', `Successfully updated picks for <strong>Preseason</strong>.`);
  res.redirect(`/weeks/preseason`);
};