const Review = require('../models/reviewModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.isBookedForUser = catchAsync(async (req, res, next) => {
  const booking = await Booking.find({
    tour: req.params.tourId,
    user: req.user.id,
  });

  if (booking.length === 0) {
    return next(new AppError('You did not book this tour 🥴', 401));
  }

  next();
});

exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.deleteReview = factory.deleteOne(Review);
