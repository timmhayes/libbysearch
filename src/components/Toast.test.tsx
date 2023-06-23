import { render, fireEvent } from '@testing-library/react';
import { Toast } from './Toast';

describe('Toast', () => {

  test('renders with message', () => {
    const message = 'This is a toast message';
    const { getByText } = render(<Toast message={message} />);
    expect(getByText(message)).toBeInTheDocument();
  });

});