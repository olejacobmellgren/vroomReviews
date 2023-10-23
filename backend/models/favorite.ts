import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  _id: {type: mongoose.Types.ObjectId},
  userID: {type: Number},
  carID: {type: mongoose.Types.ObjectId, ref: 'Car'}
});

const Favorite = mongoose.model('UserFavorite', favoriteSchema);

export default Favorite;
