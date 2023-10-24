import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  _id: {type: mongoose.Types.ObjectId},
  rating: {type: Number},
  review: {type: String},
  car: {type: mongoose.Types.ObjectId, ref: 'Car'},
  userID: {type: Number},
  username: {type: String}
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;