import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
    company: {type: String},
    model: {type: String},
    image: {type: String},
    horsepower: {type: String},
    transmissionType: {type: String},
    drivetrain: {type: String},
    numOfDoors: {type: String},
    price: {type: String},
    year: {type: String},
    carBody: {type: String},
    engineType: {type: String},
    numOfCylinders: {type: String},
    rating: {type: Number}
});

const Car = mongoose.model('Car', carSchema);

export default Car;