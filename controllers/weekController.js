const mongoose = require('mongoose');
const Week = mongoose.model('Week');
const User = mongoose.model('User');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const sortByWeeklyPoints = (week) => {
  return week.picks.sort(function(a, b) {
    const pickA = (a._doc.weeklyPoints);
    const pickB = (b._doc.weeklyPoints);
    return pickB - pickA;
  });
};

const sortWeeks = (weeks) => {
  return weeks.sort(function(a, b) {
    return -1;
  });
}

exports.getWeeks = async (req, res) => {
  // 1. Query the database for a list of all Weeks
  const weeks = await Week.find();
  sortWeeks(weeks);
  res.render('weeks', { title: 'Weeks', weeks });
};

exports.addWeek = (req, res) => {
  res.render('editWeek', { title: 'Add Week' });
};

exports.createWeek = async (req, res) => {
  const week = await (new Week(req.body)).save();
  req.flash('success', `Successfully Created ${week.name}.`);
  res.redirect(`/weeks/addgame/${week.slug}`);
};

exports.getGameWeeks = async (req, res) => {
  // 1. Query the database for a list of all Weeks
  const weeks = await Week.find();
  weeks.addOn = '/addgame';
  res.render('weeks', { title: 'Weeks', weeks });
};

exports.getWinnerWeeks = async (req, res) => {
  // 1. Query the database for a list of all Weeks
  const weeks = await Week.find();
  sortWeeks(weeks);
  weeks.addOn = '/winner';
  res.render('weeks', { title: 'Weeks', weeks });
};

exports.getWeekBySlug = async (req, res, next) => {
  const week = await Week.findOne({ slug: req.params.slug });
  const weekGames = await Week.getWeekByGameDate(req.params.slug);
  week.games = weekGames[0].games;
  const users = await User.getUsersAlphabetically();
  if (!week) return next();
  const maxWins = await Week.getMaxWins(req.params.slug);
  week.maxWins = maxWins[0].maxWins;
  sortByWeeklyPoints(week);
  // res.json(week);
  res.render('week', { title: `${week.name} spread picks!`, week, users });
};

exports.getStandings = async (req, res) => {
  const users = await User.getTopUsers();
  res.render('standings', { users, title: 'Standings' });
};

exports.getHomePage = async (req, res) => {
  const users = await User.getTopUsers();
  const weeks = await Week.find();
  const slugName = `week-${weeks.length}`;
  const weekArray = await Week.find({ slug: `${slugName}`});
  const prevSlugName = `week-${weeks.length-1}`;
  const prevWeekArray = await Week.find({ slug: `${prevSlugName}`});
  const prevWeek = prevWeekArray[0];
  prevWeek ? sortByWeeklyPoints(prevWeek) : '';
  const week = weekArray[0];
  const weekGames = await Week.getRecentWeekByGameDate();
  week.games = weekGames[0].games;
  const maxWins = await Week.getMaxWins();
  maxWins.length ? week.maxWins = maxWins[0].maxWins : week.maxWins = 0;
  // week.maxWins = maxWins[0].maxWins;
  const startOfSeason = new Date(2019, 7, 24, 19, 0, 0, 0);
  res.render('index', { users, week, title: 'Home Page', prevWeek, startOfSeason });
};

exports.getRules = (req, res) => {
  res.render('rules', {title: 'Rules'});
};