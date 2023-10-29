import React, { useState, MouseEventHandler } from 'react';
import { StarRating } from 'star-rating-react-ts';
import '../assets/ReviewSection.css';
import { Review } from '../types/Review';
import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../graphQL/mutations';
import { REMOVE_REVIEW } from '../graphQL/mutations';
import { CircularProgress } from '@mui/material';

const ReviewSection = ({
  userReview,
  reviews,
  carID,
}: {
  userReview: Review | undefined;
  reviews: Review[];
  carID: string;
}) => {
  let amountOfRatingsForCar = reviews.length;

  const userID = Number(localStorage.getItem('userID'));
  const [reviewCarPopup, setReviewCarPopup] = useState(false);
  const [visibleDeletePopup, setVisibleDeletePopup] = useState(false);
  const [username, setUsername] = useState(userReview?.username || '');
  const [reviewAdded, setReviewAdded] = useState(false);
  const [rating, setRating] = useState(userReview?.rating || 0);
  const [reviewText, setReviewText] = useState(userReview?.review || '');

  const [addReview, { loading: addLoading, error: addError, data: addData }] = useMutation(ADD_REVIEW, {
    variables: {
      userID: userID,
      car: carID,
      rating: rating,
      review: reviewText,
      username: username,
    },
  });

  const [removeReview, {
    loading: removeLoading,
    error: removeError,
    data: removeData,
  }
  ] = useMutation(REMOVE_REVIEW, {
    variables: {
      userID: userID,
      car: carID,
    },
  });

  const closeOrOpen: MouseEventHandler<HTMLDivElement> = (e) => {
    const isClose = (e.target as HTMLElement).closest('#popup');
    if (!isClose) {
      setReviewCarPopup(false);
      setVisibleDeletePopup(false);
    }
  };

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
    amountOfRatingsForCar++;
  }

  // Delete review from database
  function handleDeleteConfirm() {
    removeReview();
    setVisibleDeletePopup(false);
    setRating(0);
    setReviewAdded(false);
    amountOfRatingsForCar--;
  }


  if (addLoading || removeLoading) return <CircularProgress />;
  if (addError || removeError) console.log(addError, removeError);

  return (
    <div>
      <div>
        {!userReview && !reviewAdded ? (
          <button
            className="reviewButton"
            onClick={() => setReviewCarPopup(true)}
          >
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
              <input className='text-area' placeholder="name" onChange={(e) => setUsername(e.target.value)}/>
              <div className="review-buttons">
                <button onClick={handleReviewSubmit} className="submit">
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
              <p>Are you sure you want to delete this review? </p>
              <button onClick={() => handleDeleteConfirm()}>
                Confirm
              </button>
              <button onClick={() => setVisibleDeletePopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div>
        {amountOfRatingsForCar === 0 ? (
          <p>There are currently no reviews for this car</p>
        ) : (
          <h1>Reviews</h1>
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
            <u className="delete-review" onClick={() => setVisibleDeletePopup(true)}>
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
                <p className="reviewer">
                  Reviewed by {review.username}
                </p>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
