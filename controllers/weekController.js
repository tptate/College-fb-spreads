const mongoose = require('mongoose');
const Week = mongoose.model('Week');
const User = mongoose.model('User');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const sortByGameDate = (week) => {
  return week.games.sort(function(a, b) {
    const dateA = new Date(a._doc.gameDate)
    const dateB = new Date(b._doc.gameDate);
    return dateA - dateB;
  });
};

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
  const week = await Week
    .findOne({ slug: req.params.slug });
  const users = await User.find();
  if (!week) return next();
  sortByWeeklyPoints(week);
  sortByGameDate(week);
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
  // if(weeks.length>1){
    const prevSlugName = `week-${weeks.length-1}`;
    const prevWeekArray = await Week.find({ slug: `${prevSlugName}`});
    const prevWeek = prevWeekArray[0];
    prevWeek ? sortByWeeklyPoints(prevWeek) : '';
  // }
  const week = weekArray[0];
  sortByGameDate(week);
  sortByWeeklyPoints(week);
  const startOfSeason = new Date(2019, 7, 24, 07, 0, 0, 0);
  res.render('index', { users, week, title: 'Home Page', prevWeek, startOfSeason });
};