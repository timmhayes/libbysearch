import React from 'react';
import { render } from '@testing-library/react';
import {
  List,
  ListItem,
  ListItemImage,
  ListItemContent,
  ListItemButtons
} from './List';

test('renders List component with children', () => {
  const { getByText } = render(
    <List>
      <ListItem>Item 1</ListItem>
      <ListItem>Item 2</ListItem>
    </List>
  );

  const listItem1 = getByText('Item 1');
  const listItem2 = getByText('Item 2');

  expect(listItem1).toBeInTheDocument();
  expect(listItem2).toBeInTheDocument();
});

test('renders ListItem component with children', () => {
  const { getByText } = render(<ListItem>Item</ListItem>);
  const listItem = getByText('Item');
  expect(listItem).toBeInTheDocument();
});

test('renders ListItemImage component with src and alt attributes', () => {
  const { getByAltText } = render(
    <ListItemImage src="/path/to/image.jpg" alt="Image" />
  );

  const image = getByAltText('Image');
  expect(image).toBeInTheDocument();
  expect(image.getAttribute('src')).toBe('/path/to/image.jpg');
});

test('renders ListItemContent component with children', () => {
  const { getByText } = render(<ListItemContent>Content</ListItemContent>);

  const content = getByText('Content');

  expect(content).toBeInTheDocument();
});

test('renders ListItemButtons component with children', () => {
  const { getByText } = render(<ListItemButtons>Buttons</ListItemButtons>);
  const buttons = getByText('Buttons');
  expect(buttons).toBeInTheDocument();
});
