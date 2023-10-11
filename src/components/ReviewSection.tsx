import React, { useState, MouseEventHandler } from 'react';
import { StarRating } from 'star-rating-react-ts';
import '../assets/ReviewSection.css';

type Review = {
  id: string;
  rating: number;
  comment: string;
  userID: string;
  userName: string;
  carID: number;
};

const ReviewSection = ({
  userReview,
  reviews,
}: {
  userReview: Review | undefined;
  reviews: Review[];
}) => {
  const amountOfRatingsForBook = reviews.length;

  const [reviewCarPopup, setReviewCarPopup] = useState(false);
  const [visibleDeletePopup, setVisibleDeletePopup] = useState(false);
  const [reviewAdded, setReviewAdded] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const closeOrOpen: MouseEventHandler<HTMLDivElement> = (e) => {
    const isClose = (e.target as HTMLElement).closest('#popup');
    if (!isClose) {
      setReviewCarPopup(false);
    }
  };

  const handleReviewTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setReviewText(event.target.value);
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
  };

  function handleReviewSubmit() {
    // Add review to database
    setReviewAdded(true);
  }

  function handleEdit() {
    if (userReview) {
      setReviewText(userReview.comment);
      setRating(userReview.rating);
    }
    setReviewCarPopup(true);
  }

  function handleDeleteConfirm(review: Review) {
    console.log(review);
    // Delete review from database
    setVisibleDeletePopup(false);
    setReviewCarPopup(false);
    setReviewAdded(false);
    setReviewText('');
    setRating(0);
  }

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
                value={reviewText}
                onChange={handleReviewTextChange}
                placeholder="Add a review to your rating"
                cols={28}
                style={{ height: 'auto', minHeight: '100px' }}
              />
              <div className="review-buttons">
                <button onClick={handleReviewSubmit} className="submit">
                  Submit review
                </button>
                {userReview ? (
                  <button
                    onClick={() => setVisibleDeletePopup(true)}
                    className="delete"
                  >
                    Delete review
                  </button>
                ) : null}
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
              <button onClick={() => handleDeleteConfirm(userReview!)}>
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
        {amountOfRatingsForBook === 0 ? (
          <p>There are currently no reviews for this book</p>
        ) : (
          <h1>Reviews</h1>
        )}
        {userReview ? (
          <div className="current-user-review">
            <p> Your review: </p>
            <div>
              <StarRating
                theme={{ size: 30 }}
                readOnly={true}
                initialRating={userReview?.rating}
              />
              <p>{userReview?.comment}</p>
            </div>
            <u className="edit" onClick={handleEdit}>
              edit
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
                <p>{review.comment}</p>
                <p className="reviewer">
                  Reviewed by <i>{review.userName}</i>{' '}
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
