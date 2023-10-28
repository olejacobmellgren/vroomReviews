import { useParams } from 'react-router-dom';
import allreviews from '../data/reviews.json';
import { StarRating } from 'star-rating-react-ts';
import ReviewSection from '../components/ReviewSection';
import Heart from '@react-sandbox/heart';
import '../assets/Carpage.css';
import { useEffect, useState } from 'react';
import { Spinner } from '@chakra-ui/spinner';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CAR } from '../graphQL/queries';
import { GET_FAVORITE_CARS } from '../graphQL/queries';
import { REMOVE_FAVORITE_CAR } from '../graphQL/mutations';
import { ADD_FAVORITE_CAR } from '../graphQL/mutations';
import { Favorite } from '../types/Favorite';
import { c } from 'vitest/dist/reporters-5f784f42.js';

const Carpage = () => {

  let { id } = useParams();
  const carID = typeof id === 'string' ? id : '';
  const company = carID?.split('-')[0];
  const model = carID?.split('-')[1];
  const userID = Number(localStorage.getItem('userID'));

  const { loading: carLoading, error: carError, data: carData } = useQuery(GET_CAR, {
    variables: {
      company: company,
      model: model,
    },
  });


  const car = carData?.car.id;
  const { data: favoriteCars, loading: favoriteLoading, error: favoriteError } = useQuery(GET_FAVORITE_CARS, {
    variables: {
      userID: userID,
    },
  });

  const [removeFavoriteCar, { data: removeFavoriteData, loading: removeFavoriteLoading, error: removeFavoriteError }] = useMutation(REMOVE_FAVORITE_CAR, {
    variables: {
      userID: userID,
      car: car,
    },
  });


  const [addFavoriteCar, { data: favoriteData }] = useMutation(ADD_FAVORITE_CAR, {
    variables: {
      userID: userID,
      carID: car,
    },
  });

  const isCarInFavorites = favoriteCars?.favoriteCars.some((favoriteCar: Favorite) => favoriteCar?.car.id === car);
  const [activeHeart, setActiveHeart] = useState(isCarInFavorites);

  const reviews = allreviews.filter(
    (review) => review?.carID.toString() === carID,
  );
  const userReview = reviews.find((review) => review?.userID === '1');


  const handleFavorite = () => {
    setActiveHeart(!activeHeart);
    if (activeHeart) {
      removeFavoriteCar();
    };
  };


  if (carLoading) return <Spinner color='red.500' size='xl'/>;
  // if (carError) console.log(carError);

  // if (favoriteLoading) return <Spinner color='red.500' size='xl'/>;
  // if (favoriteError) console.log(favoriteError);
  if (removeFavoriteLoading) return <Spinner color='red.500' size='xl'/>;
  if (removeFavoriteError) console.log(removeFavoriteError);
  

  return (
    <div className="carpage-container">
      <div className="top-section">
        <img className="carpage-image" src={carData?.car?.image} alt={carData?.car?.image} />
        <div>
          <p className="title">
            {carData?.car?.company} {carData?.car?.model}
          </p>
          <p className="year">{carData?.car?.year}</p>
          <div className="rating">
            {carData && <StarRating readOnly={true} initialRating={carData?.car?.rating} />}
            <div className="amount-rating">
              <p>{carData?.car?.rating} / 5 </p> <p>|</p>
              <p> {reviews.length} ratings</p>
            </div>
          </div>

          <div className="heart-info-container">
            <Heart
              width={100}
              className="heart"
              height={100}
              inactiveColor="#fff"
              active={activeHeart}
              onClick={() => handleFavorite()}/>
          </div>
        </div>
      </div>
      <div className="info">
        <div className="info-container">
          <p className="info-text">Price: {carData?.car?.price}</p>
          <p className="info-text">Drivetrain: {carData?.car?.drivetrain}</p>
        </div>
        <div className="info-container">
          <p className="info-text">Type: {carData?.car?.carBody}</p>
          <p className="info-text">Horsepower: {carData?.car?.horsepower}</p>
        </div>
        <div className="info-container">
          <p className="info-text">Number of doors: {carData?.car?.numOfDoors}</p>
          <p className="info-text">Type of engine: {carData?.car?.engineType}</p>
        </div>
      </div>
      <div>
        <ReviewSection userReview={userReview} reviews={reviews} />
      </div>
    </div>
  );
};

export default Carpage;
