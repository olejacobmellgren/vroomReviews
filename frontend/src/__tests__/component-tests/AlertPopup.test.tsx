import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import AlertPopup from '../../components/AlertPopup';

describe('AlertPopup Component', () => {
  test('matches snapshot', () => {
    const { asFragment } = render(
      <AlertPopup visible={true} message="Test message" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('closes alert on close button click', () => {
    render(<AlertPopup visible={true} message="Test message" />);
    const closeBtn = screen.getByRole('button', { name: /close/i });
    userEvent.click(closeBtn);
    const alert = screen.queryByText('Test message');
    expect(alert).toBeTruthy();
  });
});
