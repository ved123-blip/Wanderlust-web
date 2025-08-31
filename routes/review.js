const express = require("express");
const router = express.Router({ mergeParams: true });  // mergeParams is important
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {validateReview, isLoggedIn, isOwner, isReviewAuthor} = require("../middleware.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const reviewController = require("../controllers/reviews.js");


// POST route for adding a review
router.post("/",
    isLoggedIn,
     validateReview, wrapAsync(reviewController.createReview));

// DELETE review
router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.deleteReview));

module.exports = router;
