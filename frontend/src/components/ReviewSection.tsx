import React, { useState, MouseEventHandler } from 'react';
import { StarRating } from 'star-rating-react-ts';
import '../assets/ReviewSection.css';
import { Review } from '../types/Review';
import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../graphQL/mutations';
import { REMOVE_REVIEW } from '../graphQL/mutations';
import { CircularProgress } from '@mui/material';
import AlertPopup from './AlertPopup';
import {
  GET_CAR_REVIEWS,
  GET_USER_REVIEWS,
  GET_USER_REVIEW_FOR_CAR,
  GET_CAR
} from '../graphQL/queries';

const ReviewSection = ({
  userReview,
  reviews,
  carID,
}: {
  userReview: Review | undefined;
  reviews: Review[];
  carID: string;
}) => {
  const userID = Number(localStorage.getItem('userID'));

  const [alertMessage, setAlertMessage] = useState('');
  const [reviewCarPopup, setReviewCarPopup] = useState(false);
  const [visibleDeletePopup, setVisibleDeletePopup] = useState(false);
  const [username, setUsername] = useState(userReview?.username || '');
  const [reviewAdded, setReviewAdded] = useState(false);
  const [rating, setRating] = useState(userReview?.rating || 0);
  const [reviewText, setReviewText] = useState(userReview?.review || '');
  const [alertVisible, setAlertVisible] = useState(false);
  const amountOfReviews = reviews.length;

  // Add or remove review from database, refetch queries to update cache with reviews

  const [addReview, { loading: addLoading, error: addError }] = useMutation(
    ADD_REVIEW,
    {
      variables: {
        userID: userID,
        car: carID,
        rating: rating,
        review: reviewText,
        username: username,
      },
      refetchQueries: [
        GET_USER_REVIEW_FOR_CAR,
        GET_CAR_REVIEWS,
        GET_USER_REVIEWS,
        GET_CAR,
      ],
    },
  );

  const [removeReview, { loading: removeLoading, error: removeError }] =
    useMutation(REMOVE_REVIEW, {
      variables: {
        userID: userID,
        car: carID,
      },
      refetchQueries: [
        GET_USER_REVIEW_FOR_CAR,
        GET_CAR_REVIEWS,
        GET_USER_REVIEWS,
        GET_CAR,
      ],
    });

  // Close popup when clicking outside of it
  const closeOrOpen: MouseEventHandler<HTMLDivElement> = (e) => {
    const isClose = (e.target as HTMLElement).closest('#popup');
    if (!isClose) {
      setReviewCarPopup(false);
      setVisibleDeletePopup(false);
    }
  };

  // Set review text to text inputed and resize textarea
  const handleReviewTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setReviewText(event.target.value);
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
  };

  // Add review to database
  function handleReviewSubmit() {
    addReview();
    setReviewAdded(true);
    setReviewCarPopup(false);
    setAlertMessage('Successfully added review!');
    setAlertVisible(true);
  }

  // Delete review from database
  function handleDeleteConfirm() {
    removeReview();
    setReviewAdded(false);
    setVisibleDeletePopup(false);
    setRating(0);
    setAlertMessage('Successfully deleted review!');
    setAlertVisible(true);
  }

  if (addLoading || removeLoading) return <CircularProgress color="warning" />;
  if (addError || removeError) setAlertMessage('Something went wrong!');

  return (
    <div>
      <div>
        {!userReview && !reviewAdded ? (
          <button className="button" onClick={() => setReviewCarPopup(true)}>
            Review this car
          </button>
        ) : null}
      </div>
      {reviewCarPopup ? (
        <div>
          <div className="popup" onClick={closeOrOpen}>
            <div className="popup-inner" id="popup">
              <StarRating
                initialRating={rating}
                onClick={(rating) => {
                  setRating(rating);
                }}
              />
              <textarea
                className="text-area"
                onChange={handleReviewTextChange}
                placeholder="Add a review to your rating"
                cols={28}
                style={{ height: 'auto', minHeight: '100px' }}
              />
              <input
                className="text-area"
                placeholder="name"
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="review-buttons">
                <button onClick={handleReviewSubmit} className="button">
                  Submit review
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {visibleDeletePopup ? (
        <div>
          <div className="popup" onClick={closeOrOpen}>
            <div className="popup-inner" id="popup">
              <p className="text">
                Are you sure you want to delete this review?{' '}
              </p>
              <button className="button" onClick={() => handleDeleteConfirm()}>
                Confirm
              </button>
              <button
                className="button"
                onClick={() => setVisibleDeletePopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div className="reviews">
        {amountOfReviews > 0 ? (
          <h1>Reviews ({amountOfReviews})</h1>
        ) : (
          <h2>There are no reviews yet for this car</h2>
        )}
        {userReview || reviewAdded ? (
          <div className="current-user-review">
            <p> Your review: </p>
            <div>
              <StarRating
                theme={{ size: 30 }}
                readOnly={true}
                initialRating={rating}
              />
              <p>{reviewText}</p>
            </div>
            <u
              className="delete-review"
              onClick={() => setVisibleDeletePopup(true)}
            >
              delete
            </u>
          </div>
        ) : null}
        {reviews.map((review) => (
          <div key={review.userID}>
            {review.userID !== userReview?.userID ? (
              <div className="user-review">
                <StarRating
                  theme={{ size: 30 }}
                  readOnly={true}
                  initialRating={review.rating}
                />
                <p>{review.review}</p>
                <p className="reviewer">Reviewed by {review.username}</p>
              </div>
            ) : null}
          </div>
        ))}
        <AlertPopup visible={alertVisible} message={alertMessage} />
      </div>
    </div>
  );
};

export default ReviewSection;
