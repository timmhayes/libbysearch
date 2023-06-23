import { render, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {

  test('renders without errors', () => {
    render(<Button onClick={() => {}} />);
  });

  test('renders with provided title', () => {
    const { getByRole } = render(<Button onClick={() => {}} title="Click Me" />);
    expect(getByRole('button', {name: /Click Me/i})).toBeInTheDocument();
  });

  test('renders with children', () => {
    const { getByRole } = render(
      <Button onClick={() => {}}>
        <span>Click Me</span>
      </Button>
    );
    expect(getByRole('button', {name: /Click Me/i})).toBeInTheDocument();
  });

  test('calls onClick when button is clicked', () => {
    const onClickMock = jest.fn();
    const { getByRole } = render(<Button onClick={onClickMock} title='Click Me' />);
    const button = getByRole('button', {name: /Click Me/i});
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalled();
  });

  test('button is disabled when disabled prop is true', () => {
    const { getByRole } = render(<Button onClick={() => {}} disabled={true} title='Click Me'/>);
    expect(getByRole('button', {name: /Click Me/i})).toBeDisabled();
  });

  test('button is not disabled when disabled prop is false', () => {
    const { getByRole } = render(<Button onClick={() => {}} disabled={false} title='Click Me'/>);
    expect(getByRole('button', {name: /Click Me/i})).not.toBeDisabled();
  });

});