import { render, fireEvent } from '@testing-library/react';
import { ButtonDelete } from './ButtonDelete';

describe('ButtonDelete', () => {

  test('renders without errors', () => {
    render(<ButtonDelete onDelete={() => {}} />);
  });

  test('renders with default title when no title prop is provided', () => {
    const { getByLabelText } = render(<ButtonDelete onDelete={() => {}} />);
    const button = getByLabelText('delete');
    expect(button).toBeInTheDocument();
  });

  test('renders with provided title', () => {
    const { getByLabelText } = render(<ButtonDelete onDelete={() => {}} title="custom" />);
    const button = getByLabelText('custom');
    expect(button).toBeInTheDocument();
  });

  test('calls onDelete when confirm button is clicked', () => {
    const onDeleteMock = jest.fn();
    const { getByLabelText } = render(<ButtonDelete onDelete={onDeleteMock} />);
    const button = getByLabelText('delete');
    fireEvent.click(button);
    fireEvent.click(button);
    expect(onDeleteMock).toHaveBeenCalled();
  });

  test('displays cancel button when confirm button is clicked', () => {
    const { getByLabelText } = render(<ButtonDelete onDelete={() => {}} />);
    const confirmButton = getByLabelText('delete');
    fireEvent.click(confirmButton);
    const cancelButton = getByLabelText('cancel delete');
    expect(cancelButton).toBeInTheDocument();
  });

  test('does not call onDelete when cancel button is clicked', () => {
    const onDeleteMock = jest.fn();
    const { getByLabelText } = render(<ButtonDelete onDelete={onDeleteMock} />);
    const confirmButton = getByLabelText('delete');
    fireEvent.click(confirmButton);
    const cancelButton = getByLabelText('cancel delete');
    fireEvent.click(cancelButton);
    expect(onDeleteMock).not.toHaveBeenCalled();
  });
});