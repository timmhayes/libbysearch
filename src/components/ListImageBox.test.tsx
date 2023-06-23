import { render } from '@testing-library/react';
import { ListImageBox } from './ListImageBox';

describe('ListImageBox', () => {

  test('renders ListImageBox component with image and content', () => {
    const { getByAltText, getByText } = render(
      <ListImageBox imgsrc="/path/to/image.jpg" imgalt="Image Alt Text">
        <p>Content</p>
      </ListImageBox>
    );

    const image = getByAltText('Image Alt Text');
    expect(image).toBeInTheDocument();
    expect(image.getAttribute('src')).toBe('/path/to/image.jpg');
    expect(getByText('Content')).toBeInTheDocument();

  });

});