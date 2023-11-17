import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { test, expect } from 'vitest';
import ScrollingMenu from '../../components/ScrollingMenu'; // Update the path accordingly
import { GET_CARS_BY_COMPANY } from '../../graphQL/queries';

const mocks = [
  {
    request: {
      query: GET_CARS_BY_COMPANY,
      variables: { company: 'Brand' }, // Update with your brand
    },
    result: {
      data: {
        carsByCompany: [
          // Mock your car data here
          { id: '1', company: 'Brand', model: 'Model1', image: 'image1.jpg' },
          { id: '2', company: 'Brand', model: 'Model2', image: 'image2.jpg' },
        ],
      },
    },
  },
];

describe('ScrollingMenu Component', () => {
  test('renders ScrollingMenu component', async () => {
    const scrollingMenu = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ScrollingMenu brand="Brand" />
      </MockedProvider>,
    );

    expect(scrollingMenu).toBeTruthy();
  });

  test('matches snapshot', () => {
    const { asFragment } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ScrollingMenu brand="Brand" />
      </MockedProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
