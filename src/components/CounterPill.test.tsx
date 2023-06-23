import { render } from '@testing-library/react';
import { CounterPill } from './CounterPill';

describe('CounterPill', () => {

  test('renders count correctly', () => {
    const { rerender, getByText } = render(<CounterPill count={0} />);
    expect(getByText('0')).toBeInTheDocument();
    rerender(<CounterPill count={10} />);
    expect(getByText('10')).toBeInTheDocument();
  });

});