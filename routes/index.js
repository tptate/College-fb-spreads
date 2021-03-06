const express = require('express');
const router = express.Router();
const weekController = require('../controllers/weekController');
const gameController = require('../controllers/gameController');
const preseasonController = require('../controllers/preseasonController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/', catchErrors(weekController.getHomePage));

// Admin routes
router.get('/weeks/add', authController.isAdmin, weekController.addWeek);
router.post('/weeks/add', authController.isAdmin, catchErrors(weekController.createWeek));
router.get('/weeks/addgame/:slug/', authController.isAdmin, catchErrors(gameController.getGames));
router.get('/weeks/addgames', authController.isAdmin, catchErrors(weekController.getGameWeeks));
router.get('/games/:id/edit', catchErrors(gameController.editGame));
router.post('/games/:id', authController.isAdmin, catchErrors(gameController.updateGame));
router.get('/weeks/winner', authController.isAdmin, catchErrors(weekController.getWinnerWeeks));
router.get('/weeks/winner/preseason', authController.isAdmin, catchErrors(preseasonController.getWinnerPreseason));
router.post('/weeks/winner/preseason', authController.isAdmin, catchErrors(preseasonController.addWinnerPreseason));
router.get('/weeks/winner/:slug', authController.isAdmin, catchErrors(gameController.getWinner));
router.post('/weeks/winner/:id/picks', catchErrors(gameController.addWinnerPicks));
router.get('/weeks/winner/:slug/edit', authController.isAdmin, catchErrors(gameController.editWinnerPicks));
router.post('/weeks/winner/:slug/picks/:id', catchErrors(gameController.updateWinnerPicks));
router.get('/resetpassword', authController.isAdmin, userController.resetForm);
// router.post('/resetpassword', catchErrors(authController.forgot));


// User routes
router.get('/weeks', authController.isLoggedIn, catchErrors(weekController.getWeeks));
router.get('/weeks/preseason', authController.isLoggedIn, catchErrors(preseasonController.getPreseason));
router.post('/weeks/preseason', catchErrors(preseasonController.addPreseason));
router.get('/weeks/preseason/:id/edit', catchErrors(preseasonController.editPreseason));
router.post('/weeks/preseason/:id', catchErrors(preseasonController.updatePreseason));
router.post('/weeks/:id/picks', catchErrors(gameController.addPicks));
router.get('/weeks/:slug/picks/:id/edit', catchErrors(gameController.editPicks));
router.post('/weeks/:slug/picks/:id', catchErrors(gameController.updatePicks));
router.get('/weeks/:slug', catchErrors(weekController.getWeekBySlug));
router.get('/standings', catchErrors(weekController.getStandings));
router.get('/rules', weekController.getRules);


// Admin route
router.post('/weeks/:id', authController.isAdmin, catchErrors(gameController.addGame));


router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/join', userController.registerForm);
router.post('/join', 
  userController.validateRegister,
  userController.join,
  authController.login
);
router.get('/logout', authController.logout);
router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', catchErrors(userController.updateAccount));
router.post('/account/forgot', authController.isAdmin, catchErrors(authController.forgot));
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token', 
  authController.confirmPasswords, 
  catchErrors(authController.update)
);

module.exports = router;