const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  res.status(200).render('overview', {
    title: 'All tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });
  let notBooked = true;

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }

  if (res.locals.user) {
    const booking = await Booking.find({
      user: res.locals.user,
      tour,
    });

    if (booking.length > 0) {
      notBooked = false;
    }
  }
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
    notBooked,
  });
});

exports.getReviewForm = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug })
  const booking = await Booking.find({
    tour: tour._id,
    user: req.user.id,
  });

  if (booking.length === 0) {
    return next(new AppError('You did not book this tour 🥴', 401));
  }
  res.status(200).render('review', {
    title: 'Review this tour',
    tour,
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

exports.getSignUpForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Sign up now',
  });
};

exports.confirmEmailForm = (req, res) => {
  res.status(200).render('emailConfirm', {
    title: 'Confirm Your Email Address',
  });
};

exports.getStepOneForm = (req, res) => {
  res.status(200).render('step1', {
    title: 'Enter your phone number',
  });
};

exports.getStepTWoForm = (req, res) => {
  res.status(200).render('step2', {
    title: 'Enter your verification code',
  });
};

exports.forgotPassword = (req, res) => {
  res.status(200).render('forgotPassword', {
    title: 'Forgot password',
  });
};

exports.resetPassword = (req, res) => {
  res.status(200).render('resetPassword', {
    title: 'Reset your password',
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id });
  const tourIDs = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'My tours',
    tours,
  });
});

exports.getMyReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ user: req.user.id });
  const tourIDs = reviews.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'My tours',
    tours,
  });
});

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

exports.updateUserData = catchAsync(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser,
  });
});
