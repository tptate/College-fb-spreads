const mongoose = require('mongoose');
const Game = mongoose.model('Game');
const Week = mongoose.model('Week');
const Pick = mongoose.model('Pick');
const User = mongoose.model('User');

exports.addGame = async (req, res) => {
  req.body.week = req.params.id;
  const week = await Week.findOne({ _id: req.body.week });
  req.body.ref = `game${week.games.length + 1}`;
  const newGame = new Game(req.body);
  await newGame.save();
  req.flash('success', 'Game saved!');
  res.redirect('back');
};

exports.editGame = async (req, res) => {
  // 1. Find the game given the ID
  const game = await Game.findOne({ _id: req.params.id });
  const week = await Week.findOne({ _id: game.week });
  game.name = week.name;
  // 2. Confirm they are the owner of the store
  // confirmOwner(store, req.user);
  // 3. Render out the edit form so the user can update
  res.render('editGame', { title: `Edit game`, game });
};

exports.updateGame = async (req, res) => {
  // find and update the game
  const game = await Game.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new game instead of the old one
    runValidators: true
  }).exec();
  const week = await Week.findOne({ _id: game.week });
  req.flash('success', `Successfully updated <strong>${week.name}</strong>.`);
  res.redirect(`/weeks/${week.slug}`);
  //redirect to the store and tell them it worked
};

async function updatePicks(pick, weeklyPoints, weeklyWins, weeklyLosses) {
  await Pick
    .findByIdAndUpdate(pick._id, 
      { weeklyPoints, weeklyWins, weeklyLosses },
      { new: true }
    );
    return
};

async function updateUser(pick, weeklyPoints, weeklyWins, weeklyLosses, oldPoints=0, oldWins=0, oldLosses=0) {
  const user = await User.findOne({ _id: pick.author });
  await User
    .findByIdAndUpdate(pick.author, 
      { totalPoints: weeklyPoints - oldPoints + user.totalPoints, totalWins: weeklyWins - oldWins + user.totalWins, totalLosses: weeklyLosses - oldLosses + user.totalLosses },
      { new: true }
    );
    return
};

async function updateWinner(reqBody) {
  const week = await Week.findOne({ _id: reqBody.week });
  week.picks.forEach((pick, j) => {
    let weeklyPoints = 0;
    let weeklyWins = 0;
    let weeklyLosses = 0;
    week.games.forEach((game, i) => {
      const gameRef = `game${i+1}`;
      const prediction = `${pick[gameRef]}`;
      const winner = `${reqBody[gameRef]}`;
      if (winner !== 'undefined') {
        if(prediction === winner) {
          weeklyWins++;
          weeklyPoints++;
        } else {
          weeklyLosses++;
        };
      };
    });
    updatePicks(pick, weeklyPoints, weeklyWins, weeklyLosses);
    updateUser(pick, weeklyPoints, weeklyWins, weeklyLosses, pick._doc.weeklyPoints, pick._doc.weeklyWins, pick._doc.weeklyLosses);
  });
  return;
};


exports.addPicks = async (req, res) => {
  req.body.week = req.params.id;
  req.body.author = req.user._id;
  if (req.user.isWinner) {
    updateWinner(req.body);
  };
  const newPick = new Pick(req.body);
  await newPick.save();
  req.flash('success', 'Picks saved!');
  res.redirect('back');
};

const confirmOwner = (pick, user) => {
  if (!pick.author.equals(user._id)) {
    throw Error('You must own the picks in order to edit them!');
  }
};

exports.editPicks = async (req, res) => {
  // 1. Find the picks given the ID
  const pick = await Pick.findOne({ _id: req.params.id });
  const week = await Week.findOne({ slug: req.params.slug });
  // 2. Confirm they are the owner of the store
  confirmOwner(pick, req.user);
  // 3. Render out the edit form so the user can update
  res.render('week', { title: `Edit ${week.name} Picks`, week, editPicks: true });
};

exports.updatePicks = async (req, res) => {
  if (req.user.isWinner) {
    req.body.week = req.params.slug;
    req.body.author = req.user._id;
    // res.json(req.body);
    updateWinner(req.body);
  };
  // find and update the picks
  const pick = await Pick.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new picks instead of the old ones
    runValidators: true
  }).exec();
  const week = await Week.findOne({ _id: pick.week });
  //redirect to the store and tell them it worked
  req.flash('success', `Successfully updated picks for <strong>${week.name}</strong>.`);
  res.redirect(`/weeks/${week.slug}`);
};