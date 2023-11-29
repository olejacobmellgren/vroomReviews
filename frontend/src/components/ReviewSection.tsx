import React, { useState, MouseEventHandler } from 'react';
import '../assets/ReviewSection.css';
import { Review } from '../types/Review';
import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../graphQL/mutations';
import { REMOVE_REVIEW } from '../graphQL/mutations';
import { CircularProgress, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import RateReviewIcon from '@mui/icons-material/RateReview';
import AlertPopup from './AlertPopup';
import {
  GET_CAR_REVIEWS,
  GET_USER_REVIEWS,
  GET_USER_REVIEW_FOR_CAR,
  GET_CAR,
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
  const [showError, setShowError] = useState(false);
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
    setShowError(false);
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
  };

  // Add review to database
  function handleReviewSubmit() {
    if (reviewText.length !== 0 && username.length !== 0) {
      setShowError(false);
      addReview();
      setReviewAdded(true);
      setReviewCarPopup(false);
      setAlertMessage('Successfully added review!');
      setAlertVisible(true);
    } else {
      setShowError(true);
    }
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
    <>
      {!userReview && !reviewAdded ? (
        <button
          className="button review-button"
          onClick={() => {
            setReviewCarPopup(true);
            setReviewText('');
            setUsername('');
          }}
        >
          Review this car
          <RateReviewIcon style={{ marginLeft: '1.2rem', color: 'grey' }} />
        </button>
      ) : null}
      {reviewCarPopup ? (
        <div className="popup" onClick={closeOrOpen}>
          <section className="popup-inner" id="popup">
            <Rating
              value={rating}
              onChange={(_event, newRating) => {
                if (newRating !== null) {
                  setRating(newRating);
                }
              }}
              emptyIcon={
                <StarIcon style={{ color: 'grey', fontSize: '3rem' }} />
              }
              style={{ fontSize: '3.5rem' }}
            />
            <textarea
              className="text-area"
              onChange={handleReviewTextChange}
              placeholder="Add a review to your rating"
              cols={28}
              style={{ height: 'auto', minHeight: '8rem' }}
            />
            <input
              className="text-area"
              placeholder="Name"
              onChange={(e) => {
                setUsername(e.target.value);
                setShowError(false);
              }}
            />
            <section className="review-buttons">
              <button onClick={handleReviewSubmit} className="button green">
                <p>Submit review</p>
              </button>
              <button
                onClick={() => {
                  setReviewCarPopup(false);
                  setShowError(false);
                }}
                className="button red"
              >
                <p>Cancel</p>
              </button>
            </section>
            {showError &&
              (reviewText.length == 0 ? (
                <p className="review-error">Review can't be empty</p>
              ) : (
                <p className="review-error">Username can't be empty</p>
              ))}
          </section>
        </div>
      ) : null}
      {visibleDeletePopup ? (
        <div className="popup" onClick={closeOrOpen}>
          <section className="popup-inner delete-popup" id="popup">
            <p className="text">
              Are you sure you want to delete this review?{' '}
            </p>
            <button onClick={() => handleDeleteConfirm()}>
              <p>Confirm</p>
            </button>
            <button onClick={() => setVisibleDeletePopup(false)}>
              <p>Cancel</p>
            </button>
          </section>
        </div>
      ) : null}
      <section className="reviews">
        {amountOfReviews > 0 ? (
          <h1>Reviews ({amountOfReviews})</h1>
        ) : (
          <h2>There are no reviews yet for this car</h2>
        )}
        {userReview || reviewAdded ? (
          <section className="current-user-review">
            <p> Your review: </p>
            <div>
              <Rating
                value={rating}
                emptyIcon={
                  <StarIcon style={{ color: 'grey', fontSize: '2rem' }} />
                }
                size="large"
                readOnly
              />
              <p>{reviewText}</p>
            </div>
            <button
              className="delete-review"
              onClick={() => setVisibleDeletePopup(true)}
            >
              <u>delete</u>
            </button>
          </section>
        ) : null}
        {reviews.map((review) => (
          <section key={review.userID}>
            {review.userID !== userReview?.userID ? (
              <div className="user-review">
                <Rating
                  value={review.rating}
                  emptyIcon={
                    <StarIcon style={{ color: 'grey', fontSize: '2rem' }} />
                  }
                  size="large"
                  readOnly
                />
                <p>{review.review}</p>
                <p className="reviewer">Reviewed by {review.username}</p>
              </div>
            ) : null}
          </section>
        ))}
        <AlertPopup visible={alertVisible} message={alertMessage} />
      </section>
    </>
  );
};

export default ReviewSection;
