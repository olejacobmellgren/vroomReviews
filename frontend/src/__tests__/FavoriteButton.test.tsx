import { test } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import FavoriteButton from '../components/FavoriteButton';
import { MockedProvider } from '@apollo/client/testing';
import { GET_FAVORITE_CARS } from '../graphQL/queries';
import { ADD_FAVORITE_CAR } from '../graphQL/mutations';

const mocks = [
  {
    request: {
      query: ADD_FAVORITE_CAR,
      variables: {
        userID: 0, // Update with your user ID
        car: 'car1',
      },
    },
    result: {
      data: {
        userID: 0, // Update with your user ID
        car: {
          company: 'Audi',
          model: 'A4',
        },
      },
    },
  },
  {
    request: {
      query: GET_FAVORITE_CARS,
      variables: { userID: 0 },
    },
    result: {
      data: {
        favoriteCars: [{ car: { id: 'car2' } }],
      },
    },
  },
];

describe('FavoriteButton Component', () => {
  test('renders without errors', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <FavoriteButton car="car1" />
      </MockedProvider>,
    );
  });

  test('matches snapshot', () => {
    const { asFragment } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <FavoriteButton car="car1" />
      </MockedProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('click favoriteButton', async () => {
    const { getByRole } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <FavoriteButton car="car1" />
      </MockedProvider>,
    );

    // Wait for the loading state to resolve
    await waitFor(() => {});
    // Find the heart element
    const heartElement = await getByRole('button');
    // Simulate a click event on the heart element
    fireEvent.click(heartElement);
  });
});
