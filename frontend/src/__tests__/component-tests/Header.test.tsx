import { render } from '@testing-library/react';
import Header from '../../components/Header';
import { test, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

test('Go to different pages', async () => {
  function setPage(page: string) {
    return page;
  }
  const { getByText, asFragment } = render(
    <BrowserRouter>
      <Header page={'home'} setPage={setPage} />
    </BrowserRouter>,
  );

  const browse = getByText('Search');
  expect(browse).toBeTruthy(); // The text is found
  await userEvent.click(browse);
  expect(asFragment()).toMatchSnapshot();

  const favorites = getByText('My Favorites');
  expect(favorites).toBeTruthy(); // The text is found
  await userEvent.click(favorites);
  expect(asFragment()).toMatchSnapshot();

  const reviews = getByText('My Reviews');
  expect(reviews).toBeTruthy(); // The text is found
  await userEvent.click(reviews);
  expect(asFragment()).toMatchSnapshot();
});
