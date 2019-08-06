const mongoose = require('mongoose');
const Week = mongoose.model('Week');
const User = mongoose.model('User');
const Preseason = mongoose.model('Preseason');
const PreseasonWinner = mongoose.model('PreseasonWinner');
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
  // res.json(req.body);
  const newPreseason = new Preseason(req.body);
  await newPreseason.save();
  req.flash('success', 'Preseason picks saved!');
  res.redirect('back');
};

const confirmOwner = (preseason, user) => {
  if (!preseason.author.equals(user._id)) {
    throw Error('You must own the picks in order to edit!');
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

function comparePicks(reqBody, preseason, division) {
  if (preseason[division] === reqBody[division]) {
    return reqBody[`${division}Points`];
  }
  return 0
}

async function updateWinner(reqBody, preseason, user) {
  let preseasonPoints = user.preseasonPoints;
  preseasonPoints += parseInt(comparePicks(reqBody, preseason, 'ACCa'));
  preseasonPoints += parseInt(comparePicks(reqBody, preseason, 'ACCc'));
  preseasonPoints += parseInt(comparePicks(reqBody, preseason, 'ACC'));
  preseasonPoints += parseInt(comparePicks(reqBody, preseason, 'SECe'));
  preseasonPoints += parseInt(comparePicks(reqBody, preseason, 'SECw'));
  preseasonPoints += parseInt(comparePicks(reqBody, preseason, 'SEC'));

  return preseasonPoints;
};

exports.getWinnerPreseason = async (req, res) => {
  // res.render('week', { title: `${week.name} games`, week, addOn: `/winner`, getWinner: true });
  // const preseasons = await Preseason.find();
  const preseasonWinner = await PreseasonWinner.find();
  const preseason = preseasonWinner[0]._doc;
  if(!preseasonWinner.length) {
    res.render('preseason', { title: `Preseason Winner Picks `, preseason, getWinner: true});
  } else {
    res.render('preseason', { title: `Preseason Winner Picks `, preseason, getWinner: true, preseasonWinner});
  }
}

exports.addWinnerPreseason = async (req, res) => {
  req.body = checkSelections(req.body);
  const preseasons = await Preseason.find();
  preseasons.map(async preseason => {
    const user = await User.findOne({ _id: preseason.author });
    const preseasonPoints = await updateWinner(req.body, preseason, user);
    await User.findOneAndUpdate({ _id: preseason.author }, { preseasonPoints }, {
      new: true,
      runValidators: true
    }).exec();
  });
  res.json(req.body);

  const preseasonWinner = await PreseasonWinner.find();
  // if(preseasonWinner.length){
  //   await PreseasonWinner.findOneAndReplace({ _id: preseasonWinner[0]._doc._id }, preseasonWinner , {
  //     new: true,
  //     runValidators: true
  //   }).exec();
  // } else {
  //   const newPreseasonWinner = new PreseasonWinner(req.body);
  //   await newPreseasonWinner.save();
  // }
  // req.flash('success', 'Picks saved!');
  // res.redirect('back');
}