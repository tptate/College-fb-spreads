const mongoose = require('mongoose');
const Week = mongoose.model('Week');
const User = mongoose.model('User');
const Preseason = mongoose.model('Preseason');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

function noSelection(division, divisionPoints) {
  if (divisionPoints === '') {
    return ['', '0'];
  }
  return [division, divisionPoints];
}

function checkSelections(reqBody) {
  [reqBody.ACCa, reqBody.ACCaPoints] = noSelection(reqBody.ACCa, reqBody.ACCaPoints);
  [reqBody.ACCc, reqBody.ACCcPoints] = noSelection(reqBody.ACCc, reqBody.ACCcPoints);
  [reqBody.ACC, reqBody.ACCPoints] = noSelection(reqBody.ACC, reqBody.ACCPoints);
  [reqBody.SECe, reqBody.SECePoints] = noSelection(reqBody.SECe, reqBody.SECePoints);
  [reqBody.SECw, reqBody.SECwPoints] = noSelection(reqBody.SECw, reqBody.SECwPoints);
  [reqBody.SEC, reqBody.SECPoints] = noSelection(reqBody.SEC, reqBody.SECPoints);
  [reqBody.Big10e, reqBody.Big10ePoints] = noSelection(reqBody.Big10e, reqBody.Big10ePoints);
  [reqBody.Big10w, reqBody.Big10wPoints] = noSelection(reqBody.Big10w, reqBody.Big10wPoints);
  [reqBody.Big10, reqBody.Big10Points] = noSelection(reqBody.Big10, reqBody.Big10Points);
  [reqBody.Pac12n, reqBody.Pac12nPoints] = noSelection(reqBody.Pac12n, reqBody.Pac12nPoints);
  [reqBody.Pac12s, reqBody.Pac12sPoints] = noSelection(reqBody.Pac12s, reqBody.Pac12sPoints);
  [reqBody.Pac12, reqBody.Pac12Points] = noSelection(reqBody.Pac12, reqBody.Pac12Points);
  [reqBody.Big12d1, reqBody.Big12d1Points] = noSelection(reqBody.Big12d1, reqBody.Big12d1Points);
  [reqBody.Big12d2, reqBody.Big12d2Points] = noSelection(reqBody.Big12d2, reqBody.Big12d2Points);
  [reqBody.Big12, reqBody.Big12Points] = noSelection(reqBody.Big12, reqBody.Big12Points);

  return reqBody;
}

exports.getPreseason = async (req, res) => {
  const users = await User.find();
  const preseasons = await Preseason.find();
  res.render('preseason', { title: `Preseason picks `, users, preseasons});
};

exports.addPreseason = async (req, res) => {
  req.body = checkSelections(req.body);
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
  
  req.body = checkSelections(req.body);

  const preseason = await Preseason.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new picks instead of the old ones
    runValidators: true
  }).exec();
  req.flash('success', `Successfully updated picks for <strong>Preseason</strong>.`);
  res.redirect(`/weeks/preseason`);
};