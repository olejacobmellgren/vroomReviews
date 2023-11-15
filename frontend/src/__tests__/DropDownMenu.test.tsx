import { vi } from 'vitest';
import { render, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DropdownMenu from '../components/DropdownMenu'; // Update the path accordingly

// Mock data for testing
const mockProps = {
  filter: 'Category',
  options: ['Option1', 'Option2', 'Option3'],
  isOpen: false,
  toggleDropdown: () => {},
  onSelect: () => {},
};

// A utility function to create a mock sessionStorage for testing
const mockSessionStorage = () => {
  const sessionStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
  };
  Object.defineProperty(global, 'sessionStorage', { value: sessionStorageMock });
};

// A utility function to cleanup after each test
const cleanupAfterTest = () => {
  cleanup();
  vi.restoreAllMocks();
};

describe('DropdownMenu Component', () => {
  beforeEach(() => {
    mockSessionStorage();
  });

  afterEach(cleanupAfterTest);

  test('renders without errors', () => {
    render(<DropdownMenu {...mockProps} />);
  });

  test('matches snapshot', () => {
    const { asFragment } = render(
      <DropdownMenu {...mockProps} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('handles option click', () => {
    const onSelectMock = vi.fn();
    const toggleDropdownMock = vi.fn();

    const { getByText } = render(
      <DropdownMenu
        {...mockProps}
        onSelect={onSelectMock}
        toggleDropdown={toggleDropdownMock}
      />
    );


    const option1 = getByText('Option1');
    userEvent.click(option1);

    // Assertions
    expect(option1).toBeTruthy();
    expect(onSelectMock).toHaveBeenCalled();
  });

  test('handles dropdown toggle', () => {
    const onSelectMock = vi.fn();
    const toggleDropdownMock = vi.fn();

    const { getByTestId } = render(
      <DropdownMenu
        {...mockProps}
        onSelect={onSelectMock}
        toggleDropdown={toggleDropdownMock}
      />
    );

    const dropdownButton = getByTestId('drop-down');
    fireEvent.click(dropdownButton);

    // Assertions
    expect(dropdownButton).toBeTruthy();
    expect(toggleDropdownMock).toHaveBeenCalled();
  });
});
