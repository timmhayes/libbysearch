import { render, screen, act, fireEvent, waitFor} from '@testing-library/react';
import mockFetch from './mocks/mockFetch';
import App from './App';

describe('App', () => {

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders title', async () => {
    render(<App />);
    const title = await screen.getByText(/LIBBY MULTI-LIBRARY SEARCH/i);
    expect(title).toBeInTheDocument();
  });

  test('searches libraries', async () => {
    const { getByRole } = render(<App />);
    const panelButton = getByRole('button', { name: /Find Libraries/i });
    expect(panelButton).toBeInTheDocument();
    await act(async () => {
      panelButton.click();
    });

    const input = getByRole('searchbox', { name: /Library Search/i });
    expect(input).toBeInTheDocument();
    await act(async () => {
      fireEvent.change(input, { target: { value: '"Sample Library' }});
    });

    expect(getByRole('heading', { name: /Sample Library, Inc./i })).toBeInTheDocument();
    const addLibraryButton = getByRole('button', { name: /Add Library/i });
    expect(addLibraryButton).toBeInTheDocument();
    await act(async () => {
      addLibraryButton.click();
    });

    expect(getByRole('button', { name: /Remove Library/i })).toBeInTheDocument();
  });


});
