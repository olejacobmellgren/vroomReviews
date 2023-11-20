import { useMutation, useQuery } from '@apollo/client';
import { CircularProgress } from '@mui/material';
import Heart from '@react-sandbox/heart';
import { REMOVE_FAVORITE_CAR } from '../graphQL/mutations';
import { ADD_FAVORITE_CAR } from '../graphQL/mutations';
import { useEffect, useState } from 'react';
import { GET_FAVORITE_CARS } from '../graphQL/queries';
import { Favorite } from '../types/Favorite';
import AlertPopup from './AlertPopup';

const FavoriteButton = ({ car }: { car: string }) => {
  const userID = Number(localStorage.getItem('userID'));
  const [alertMessage, setAlertMessage] = useState('');
  const [favoriteAlert, setFavoriteAlert] = useState(false);

  const {
    data: favoriteCars,
    loading: favoriteLoading,
    error: favoriteError,
  } = useQuery(GET_FAVORITE_CARS, {
    variables: {
      userID: userID,
    },
  });

  // Check if car is in favorites
  const isCarInFavorites = favoriteCars?.favoriteCars.some(
    (favoriteCar: Favorite) => favoriteCar?.car.id === car,
  );
  const [activeHeart, setActiveHeart] = useState(isCarInFavorites);

  // Set activeHeart to true if car is in favorites
  useEffect(() => {
    if (isCarInFavorites) {
      setActiveHeart(true);
    } else {
      setActiveHeart(false);
    }
  }, [isCarInFavorites]);

  // Add or remove car from favorites, refetch queries to update cache with favorites

  const [
    removeFavoriteCar,
    { loading: removeFavoriteLoading, error: removeFavoriteError },
  ] = useMutation(REMOVE_FAVORITE_CAR, {
    variables: {
      userID: userID,
      car: car,
    },
    refetchQueries: [GET_FAVORITE_CARS],
  });

  const [
    addFavoriteCar,
    { loading: addFavoriteLoading, error: addFavoriteError },
  ] = useMutation(ADD_FAVORITE_CAR, {
    variables: {
      userID: userID,
      car: car,
    },
    refetchQueries: [GET_FAVORITE_CARS],
  });

  // Handle favorite button click
  const handleFavorite = () => {
    if (activeHeart) {
      removeFavoriteCar();
      setAlertMessage('Successfully removed from favorites!');
    } else {
      addFavoriteCar();
      setAlertMessage('Successfully added to favorites!');
    }
    setFavoriteAlert(true);
    setActiveHeart(!activeHeart);
  };

  if (favoriteError || removeFavoriteError || addFavoriteError)
    setAlertMessage('Something went wrong!');
  if (favoriteLoading || removeFavoriteLoading || addFavoriteLoading)
    return <CircularProgress color="warning" />;

  return (
    <>
      <Heart
        width={100}
        className="heart"
        height={100}
        inactiveColor="#fff"
        active={activeHeart}
        onClick={() => handleFavorite()}
      />
      <AlertPopup visible={favoriteAlert} message={alertMessage} />
    </>
  );
};

export default FavoriteButton;
