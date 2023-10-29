import { useMutation, useQuery } from '@apollo/client';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import Heart from '@react-sandbox/heart';
import { REMOVE_FAVORITE_CAR } from '../graphQL/mutations';
import { ADD_FAVORITE_CAR } from '../graphQL/mutations';
import { useState } from 'react';
import { GET_FAVORITE_CARS } from '../graphQL/queries';
import { Favorite } from '../types/Favorite';

const FavoriteButton = ({ car }: { car: string }) => {
  const [favoriteAlert, setFavoriteAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const severity =
    alertMessage === 'Something went wrong!' ? 'error' : 'success';
  const userID = Number(localStorage.getItem('userID'));

  const {
    data: favoriteCars,
    loading: favoriteLoading,
    error: favoriteError,
  } = useQuery(GET_FAVORITE_CARS, {
    variables: {
      userID: userID,
    },
  });

  const isCarInFavorites = favoriteCars?.favoriteCars.some(
    (favoriteCar: Favorite) => favoriteCar?.car.id === car,
  );
  const [activeHeart, setActiveHeart] = useState(isCarInFavorites);

  const [
    removeFavoriteCar,
    { loading: removeFavoriteLoading, error: removeFavoriteError },
  ] = useMutation(REMOVE_FAVORITE_CAR, {
    variables: {
      userID: userID,
      car: car,
    },
  });

  const [
    addFavoriteCar,
    { loading: addFavoriteLoading, error: addFavoriteError },
  ] = useMutation(ADD_FAVORITE_CAR, {
    variables: {
      userID: userID,
      car: car,
    },
  });

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

  const handleClose = () => {
    setFavoriteAlert(false);
  };

  // if (favoriteError || removeFavoriteError || addFavoriteError)
  //   setAlertMessage('Something went wrong!');
  // if (favoriteLoading || removeFavoriteLoading || addFavoriteLoading)
  //   return <CircularProgress />;

  return (
    <div className="heart-info-container">
      <Heart
        width={100}
        className="heart"
        height={100}
        inactiveColor="#fff"
        active={activeHeart}
        onClick={() => handleFavorite()}
      />
      <Snackbar
        open={favoriteAlert}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FavoriteButton;
