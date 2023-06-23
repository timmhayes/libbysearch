import { render, fireEvent } from '@testing-library/react';
import { SearchBox } from './SearchBox';

describe('SearchBox', () => {

  test('renders with label, input, and placeholder', () => {
    const handleChange = jest.fn();
    const { getByLabelText, getByPlaceholderText } = render(
      <SearchBox
        value=""
        label="Search"
        placeholder="Enter search term"
        onChange={handleChange}
      />
    );

    expect(getByLabelText('Search')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter search term')).toBeInTheDocument();
  });

  test('calls onChange callback when input value changes', () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBox
        value=""
        label="Search"
        placeholder="Enter search term"
        onChange={handleChange}
      />
    );

    const input = getByPlaceholderText('Enter search term');
    fireEvent.change(input, { target: { value: 'example' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('example');
  });

  test('calls onSubmit callback when Enter key is pressed', () => {
    const handleSubmit = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBox
        value=""
        label="Search"
        placeholder="Enter search term"
        onChange={() => {}}
        onSubmit={handleSubmit}
      />
    );

    const input = getByPlaceholderText('Enter search term');
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  test('does not call onSubmit callback when other keys are pressed', () => {
    const handleSubmit = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBox
        value=""
        label="Search"
        placeholder="Enter search term"
        onChange={() => {}}
        onSubmit={handleSubmit}
      />
    );

    const input = getByPlaceholderText('Enter search term');
    fireEvent.keyDown(input, { key: 'Escape' });

    expect(handleSubmit).not.toHaveBeenCalled();
  });

});