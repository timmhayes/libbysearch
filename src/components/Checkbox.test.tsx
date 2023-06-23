import { render, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {

  test('renders without errors', () => {
    render(<Checkbox title="Checkbox" onChange={() => {}} />);
  });

  test('renders with provided title', () => {
    const { getByLabelText } = render(<Checkbox title="Checkbox" onChange={() => {}} />);
    const checkbox = getByLabelText('Checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  test('calls onChange with true when checkbox is checked', () => {
    const onChangeMock = jest.fn();
    const { getByLabelText } = render(<Checkbox title="Checkbox" onChange={onChangeMock} />);
    const checkbox = getByLabelText('Checkbox');
    fireEvent.click(checkbox);
    expect(onChangeMock).toHaveBeenCalledWith(true);
  });

  test('calls onChange with false when checkbox is unchecked', () => {
    const onChangeMock = jest.fn();
    const { getByLabelText } = render(<Checkbox title="Checkbox" onChange={onChangeMock} />);
    const checkbox = getByLabelText('Checkbox');
    fireEvent.click(checkbox);
    fireEvent.click(checkbox);
    expect(onChangeMock).toHaveBeenCalledWith(false);
  });

  test('checkbox is initially unchecked', () => {
    const { getByLabelText } = render(<Checkbox title="Checkbox" onChange={() => {}} />);
    const checkbox = getByLabelText('Checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('checkbox is initially checked when checked prop is true', () => {
    const { getByLabelText } = render(<Checkbox title="Checkbox" checked={true} onChange={() => {}} />);
    const checkbox = getByLabelText('Checkbox');
    expect(checkbox).toBeChecked();
  });

  test('checkbox is checked when clicked', () => {
    const { getByLabelText } = render(<Checkbox title="Checkbox" onChange={() => {}} />);
    const checkbox = getByLabelText('Checkbox');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

});