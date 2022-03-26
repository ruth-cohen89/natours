const express = require('express');

const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewsController.getOverview
);
router.get(
  '/:slug/review',
  authController.protect,
  authController.restrictTo('user'),
  viewsController.getReviewForm
);
router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/signup', authController.isLoggedIn, viewsController.getSignUpForm);
router.get('/emailConfirm/:token', viewsController.confirmEmailForm);
router.get('/forgotPassword', viewsController.forgotPassword);
router.get('/resetPassword/:token', viewsController.resetPassword);
router.get('/stepOne', viewsController.getStepOneForm);
router.get('/stepTwo/:id', viewsController.getStepTWoForm);

router.get('/me', authController.protect, viewsController.getAccount);
router.get('/my-tours', authController.protect, viewsController.getMyTours);
router.get('/my-reviews', authController.protect, viewsController.getMyReviews);

module.exports = router;
