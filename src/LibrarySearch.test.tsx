import { render, fireEvent, screen, waitFor, act} from '@testing-library/react';
import LibrarySearch from './LibrarySearch';
import mockFetch from './mocks/mockFetch';
import { debug } from 'jest-preview';

describe('LibrarySearch', () => {

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders the search box', () => {
    const { getByLabelText } = render(<LibrarySearch />);
    const searchBox = getByLabelText('Library Search:');
    expect(searchBox).toBeInTheDocument();
  });

  test('displays matching libraries', async () => {

    const { getByLabelText, findAllByRole } = render(<LibrarySearch />);
    const searchBox = getByLabelText('Library Search:');
    fireEvent.change(searchBox, { target: { value: 'New York' } });
    const matchingLibraries = await findAllByRole('listitem');
    expect(matchingLibraries).toHaveLength(1);
    const addButton = getByLabelText('Add Library');
    expect(addButton).toBeInTheDocument();
    await act(() => {
      addButton.click();
    });
    expect(getByLabelText('Remove Library')).toBeInTheDocument();

  });

});