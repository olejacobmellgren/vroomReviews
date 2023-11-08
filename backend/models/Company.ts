import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId },
  name: { type: String },
  logo: { type: String },
});

const Company = mongoose.model('Company', companySchema);

export default Company;
