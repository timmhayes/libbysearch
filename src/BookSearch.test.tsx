import mockFetch from './mocks/mockFetch';
import { LibraryContext} from './context/LibraryContext';
import { render, fireEvent, waitFor, act} from '@testing-library/react';
import BookSearch from './BookSearch';

const mockState = {
  state: {
    libraries:[
      {
        id: 'testlibrary',
        websiteId: 123,
        name: 'Test Library'
      }
    ]
  }, dispatch: () => {}
}

interface LibraryContextProps {
  children: React.ReactNode;
}

const LibraryContextWrapper = ({ children }: LibraryContextProps) => {
  return (
    <LibraryContext.Provider value={mockState}>
      {children}
    </LibraryContext.Provider>
  );
};


describe('BookSearch', () => {

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders default warning message when no libraries are available', () => {
    const { getByText } = render(<BookSearch />);
    const warningText = getByText(`have any libraries listed`, { exact: false });
    expect(warningText).toBeInTheDocument();
  });

  test('renders the search box and form elements when libraries are available', async () => {
    const { container, getByText, getByLabelText, getAllByRole} = render(<BookSearch />, { wrapper: LibraryContextWrapper });
    expect(getByLabelText(/ebook/i)).toBeInTheDocument();
    expect(getByLabelText(/audiobook/i)).toBeInTheDocument();
    expect(getByLabelText(/magazine/i)).toBeInTheDocument();
    expect(getByText('Book Search:')).toBeInTheDocument();
    expect(container.querySelector('button.search')).toBeInTheDocument();
  });

  test('disables the search button when the search query is empty', () => {
    const { getByRole } = render(<BookSearch />, { wrapper: LibraryContextWrapper });
    expect(getByRole('button', {name: /search/i})).toBeDisabled();
  });

  test('enables the search button when the search query is not empty', async () => {
    const { getByLabelText, getByRole } = render(<BookSearch />, { wrapper: LibraryContextWrapper });
    const searchBox = getByLabelText('Book Search:');
    const searchButton = getByRole('button', {name: /search/i});
    fireEvent.change(searchBox, { target: { value: 'Kurt Vonnegut' } });
    expect(searchButton).toBeEnabled();
  });

  test('calls the search function when the search button is clicked', async () => {
    const { getByLabelText, getByRole } = render(<BookSearch />, { wrapper: LibraryContextWrapper })
    const searchBox = getByLabelText('Book Search:');
    const searchButton =  getByRole('button', {name: /search/i});
    fireEvent.change(searchBox, { target: { value: 'Kurt Vonnegut' } });
    await waitFor(() => expect(searchButton).toBeEnabled());
    await act(async () => {
      fireEvent.click(searchButton);
    });
    expect(getByRole('heading', {name: /Cat's Cradle/i})).toBeInTheDocument();
    expect(getByRole('img', { name: /Cover of Cat's Cradle/i})).toBeInTheDocument();
    expect(getByRole('link', {name: /Book available Test Library/i})).toBeInTheDocument();
    expect(getByRole('link', {name: /Book not available Test Library/i})).toBeInTheDocument();
  });
});