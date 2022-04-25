const Review = require("../models/Review");
const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");
const createReview = async (req, res) => {
  const { product: productId } = req.body;
  const isValidProduct = await Product.findOne({ _id: productId });
  if (!isValidProduct) {
    throw new CustomError.NotFoundError("Product not found with that id");
  }
  const isReviewSubmitted = await Review.findOne({
    user: req.user.userId,
    product: productId,
  });
  if (isReviewSubmitted) {
    throw new CustomError.BadRequestError(
      "already submitted review for this product"
    );
  }
  req.body.user = req.user.userId;
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
};

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({});

  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

const updateReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const { rating, title, comment } = req.body;
  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new CustomError.NotFoundError("no review found");
  }
  checkPermissions(req.user, review.user);

  review.rating = rating;
  review.title = title;
  review.comment = comment;
  await review.save();

  res.status(StatusCodes.OK).json({ review });
};
const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });
  console.log("qwe");

  console.log(review);

  if (!review) {
    throw new CustomError.NotFoundError("no review found");
  }
  checkPermissions(req.user, review.user);

  console.log(review);
  await review.remove();

  res.status(StatusCodes.OK).json({ msg: "review successfully deleted" });
};
const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new CustomError.NotFoundError("no review with that id");
  }
  res.status(StatusCodes.OK).json({ review });
};

module.exports = {
  createReview,
  getAllReviews,
  deleteReview,
  getSingleReview,
  updateReview,
};
