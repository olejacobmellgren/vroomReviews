import mongoose from 'mongoose';

// Mongoose schema for a favorite
const favoriteSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId },
  userID: { type: Number },
  car: { type: mongoose.Types.ObjectId, ref: 'Car' },
});

const Favorite = mongoose.model('UserFavorite', favoriteSchema);

export default Favorite;
