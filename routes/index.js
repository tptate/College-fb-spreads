const express = require('express');
const router = express.Router();
const weekController = require('../controllers/weekController');
const gameController = require('../controllers/gameController');
const storeController = require('../controllers/storeController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');
const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/', catchErrors(weekController.getWeeks));
router.get('/weeks', authController.isLoggedIn, catchErrors(weekController.getWeeks));

router.get('/add', authController.isAdmin, weekController.addWeek);
router.post('/add', authController.isAdmin, catchErrors(weekController.createWeek));

router.post('/games/add', authController.isAdmin, catchErrors(gameController.addGame));
router.get('/games/:id/edit', catchErrors(gameController.editGame));
router.post('/games/:id', authController.isAdmin, catchErrors(gameController.updateGame));
router.post('/weeks/:id', authController.isAdmin, catchErrors(gameController.addGame));
router.post('/weeks/:id/picks', catchErrors(gameController.addPicks));
router.get('/weeks/:slug/picks/:id/edit', catchErrors(gameController.editPicks));
router.post('/weeks/:slug/picks/:id', catchErrors(gameController.updatePicks));

router.get('/weeks/:slug', catchErrors(weekController.getWeekBySlug));
router.get('/weeks/:id/edit', catchErrors(gameController.editWeek));

router.get('/standings', catchErrors(weekController.getStandings));


router.get('/tags', catchErrors(storeController.getStoresByTag));
router.get('/tags/:tag', catchErrors(storeController.getStoresByTag));

router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/register', userController.registerForm);

router.post('/register', 
  userController.validateRegister,
  userController.register,
  authController.login
);

router.get('/logout', authController.logout);

router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', catchErrors(userController.updateAccount));

router.post('/account/forgot', catchErrors(authController.forgot));
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token', 
  authController.confirmPasswords, 
  catchErrors(authController.update)
);
router.get('/map', storeController.mapPage);
router.get('/hearts', authController.isLoggedIn, catchErrors(storeController.getHearts));
router.post('/reviews/:id', authController.isLoggedIn, catchErrors(reviewController.addReview));

router.get('/top/', catchErrors(storeController.getTopStores));

/* 
  API
*/

router.get('/api/search', catchErrors(storeController.searchStores));
router.get('/api/stores/near', catchErrors(storeController.mapStores));
router.post('/api/stores/:id/heart', catchErrors(storeController.heartStore));

module.exports = router;