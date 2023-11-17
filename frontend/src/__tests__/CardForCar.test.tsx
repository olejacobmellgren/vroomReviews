import { render } from '@testing-library/react';
import { test, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import CardForCar from '../components/CardForCar';
import { BrowserRouter } from 'react-router-dom';

test('Check path correct when image is clicked', async () => {
  const { getByRole, asFragment } = render(
    <BrowserRouter>
      <CardForCar
        brand="Ferrari"
        model="F40"
        carIMG="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/F40_Ferrari_20090509.jpg/1200px-F40_Ferrari_20090509.jpg"
        showInfo={false}
      />
    </BrowserRouter>,
  );

  const carimg = getByRole('img');
  expect(carimg).toBeTruthy(); // The text is found
  await userEvent.click(carimg);
  expect(asFragment()).toMatchSnapshot();
  const { pathname } = location;

  expect(pathname).toBe('/project2/carpage/Ferrari-F40');
});
