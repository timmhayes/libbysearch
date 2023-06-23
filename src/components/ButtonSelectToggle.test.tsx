import { render, fireEvent } from '@testing-library/react';
import { ButtonSelectToggle } from './ButtonSelectToggle';

describe('ButtonSelectToggle', () => {

  test('renders without errors', () => {
    render(<ButtonSelectToggle selected={false} onAdd={() => {}} onRemove={() => {}} />);
  });

  test('renders with "Add" title when selected is false', () => {
    const { getByLabelText } = render(
      <ButtonSelectToggle selected={false} onAdd={() => {}} onRemove={() => {}} />
    );
    const button = getByLabelText('Add');
    expect(button).toBeInTheDocument();
  });

  test('renders with "Remove" title when selected is true', () => {
    const { getByLabelText } = render(
      <ButtonSelectToggle selected={true} onAdd={() => {}} onRemove={() => {}} />
    );
    const button = getByLabelText('Remove');
    expect(button).toBeInTheDocument();
  });

  test('calls onAdd when clicked and selected is false', () => {
    const onAddMock = jest.fn();
    const onRemoveMock = jest.fn();
    const { getByLabelText } = render(
      <ButtonSelectToggle selected={false} onAdd={onAddMock} onRemove={onRemoveMock} />
    );
    const button = getByLabelText('Add');
    fireEvent.click(button);
    expect(onAddMock).toHaveBeenCalled();
    expect(onRemoveMock).not.toHaveBeenCalled();
  });

  test('calls onRemove when clicked and selected is true', () => {
    const onAddMock = jest.fn();
    const onRemoveMock = jest.fn();
    const { getByLabelText } = render(
      <ButtonSelectToggle selected={true} onAdd={onAddMock} onRemove={onRemoveMock} />
    );
    const button = getByLabelText('Remove');
    fireEvent.click(button);
    expect(onRemoveMock).toHaveBeenCalled();
    expect(onAddMock).not.toHaveBeenCalled();
  });

});