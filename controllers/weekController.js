const mongoose = require('mongoose');
const Week = mongoose.model('Week');
const User = mongoose.model('User');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid')

exports.getWeeks = async (req, res) => {
  // 1. Query the database for a list of all stores
  const weeks = await Week.find();
  res.render('weeks', { title: 'Weeks', weeks });
};

exports.addWeek = (req, res) => {
  res.render('editWeek', { title: 'Add Week' });
};

exports.createWeek = async (req, res) => {
  const week = await (new Week(req.body)).save();
  req.flash('success', `Successfully Created ${week.name}.`);
  res.redirect(`/weeks/${week.slug}`);
};

exports.getWeekBySlug = async (req, res, next) => {
  const week = await Week.findOne({ slug: req.params.slug });
  if(!week) return next();
  res.render('week', { title: `${week.name} spread picks!`, week });
};

exports.getStandings = async (req, res) => {
  const users = await User.getTopUsers();
  res.render('standings', { users, title: 'Standings' });
};

