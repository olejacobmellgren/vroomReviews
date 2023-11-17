import { render, fireEvent, waitFor } from '@testing-library/react';
import { test, expect } from 'vitest';
import ReviewSection from '../components/ReviewSection'; // Update the path accordingly
import { MockedProvider } from '@apollo/client/testing';
import { ADD_REVIEW } from '../graphQL/mutations';
import userEvent from '@testing-library/user-event';

const mockProps = {
  userReview: {
    id: '1',
    rating: 5,
    review: 'Test review',
    username: 'Test user1',
    car: '123',
    userID: 123,
  },
  reviews: [],
  carID: '123',
};

const mocks = [
  {
    request: {
      query: ADD_REVIEW,
      variables: {
        userID: 0,
        car: '1',
        rating: 5,
        review: 'Test review',
        username: 'Test user2',
      },
    },
    result: {
      data: {
        rating: 5,
        review: 'Test review',
        username: 'Test user2',
      },
    },
  },
];

describe('ReviewSection Component', () => {
  test('renders the component without errors', () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ReviewSection
          userReview={mockProps.userReview}
          reviews={[]}
          carID="123"
        />
      </MockedProvider>,
    );
    expect(container).toBeTruthy();
  });

  test('matches snapshot', () => {
    const { asFragment } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ReviewSection
          userReview={mockProps.userReview}
          reviews={[]}
          carID="123"
        />
      </MockedProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('displays the review form when "Review this car" button is clicked', () => {
    const { getByText, getByPlaceholderText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ReviewSection userReview={undefined} reviews={[]} carID="1" />
      </MockedProvider>,
    );

    const reviewButton = getByText('Review this car');
    fireEvent.click(reviewButton);

    const reviewTextArea = getByPlaceholderText('Add a review to your rating');
    expect(reviewTextArea).toBeTruthy();
  });

  test('adds a review when the "Submit review" button is clicked', async () => {
    const { getByText, getByPlaceholderText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ReviewSection userReview={undefined} reviews={[]} carID="1" />
      </MockedProvider>,
    );

    const reviewButton = getByText('Review this car');
    fireEvent.click(reviewButton);

    const reviewTextArea = getByPlaceholderText('Add a review to your rating');
    userEvent.type(reviewTextArea, 'Test review');

    const submitButton = getByText('Submit review');
    userEvent.click(submitButton);

    await waitFor(() => {});
  });
});
