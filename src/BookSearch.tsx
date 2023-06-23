import { useState } from 'react';
import { useLibraryContext } from './context/LibraryContext';
import { findBooks } from './utils/DataTools';
import { BookFormatType, BookFormatListType } from './types';
import { Checkbox } from './components/Checkbox';
import { Button } from './components/Button';
import { ListImageBox }  from './components/ListImageBox';
import { Panel } from './components/Panel';
import { SearchBox } from './components/SearchBox';
import { List, ListItem, ListItemImage, ListItemContent } from './components/List'
import './BookSearch.scss'
import time from './img/time.svg';
import check from './img/check.svg'


function BookSearch () {
  const {state} = useLibraryContext();
  const [formats, setFormats] = useState<BookFormatListType>(['ebook', 'audiobook', 'magazine']);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>([]);

  enum SearchStatus {
    Idle = 1,
    Searching = 2,
    Results = 3
  }

  const [searchStatus, setSearchStatus] = useState(SearchStatus.Idle);

  const updateFormats = (format: BookFormatType, isEnabled: boolean) => {
    if (isEnabled) {
      setFormats([...formats, format])
    } else {
      setFormats(formats.filter(f => f !== format))
    }
  }

  const search = async () => {
    setSearchStatus(SearchStatus.Searching);
    const books = await findBooks(searchQuery, state.libraries, formats)
    setSearchResults(books);
    setSearchStatus(SearchStatus.Results);
  }

  return (
    <>
      <h2>Find Books</h2>
      {state.libraries.length > 0
        ?<Panel title='Search'>
          <SearchBox
            label='Book Search:'
            placeholder="Book title or author"
            value={searchQuery}
            onChange={value => setSearchQuery(value)}
            onSubmit={search}
          />
          <div className='margin-20'>
            <label className='block-label'>Type:</label>
            <Checkbox title="eBook"     checked={true} onChange={(enabled) => updateFormats('ebook', enabled)}/>
            <Checkbox title="Audiobook" checked={true} onChange={(enabled) => updateFormats('audiobook', enabled)}/>
            <Checkbox title="Magazine"  checked={true} onChange={(enabled) => updateFormats('magazine', enabled)}/>
          </div>
          {formats.length === 0 && <p className='error'>You must select at least one media type to search.</p>}
          <Button className='search' onClick={search} disabled={searchQuery.length === 0 || formats.length === 0}>Search</Button>
        </Panel>
        :<Panel title='Instructions'>
          You don't have any libraries listed. Click the <b>Find Libraries</b> tab above to add several libraries.
        </Panel>
        }
        {searchResults.length > 0 &&
        <List>
          {searchResults.map((book: any) => (
            <ListItem key={book.id}>
              <ListItemImage src={book.image} alt={`Cover of ${book.title}`}/>
              <ListItemContent>
                <h3 className='margin-0'>{book.title} / {book.author}</h3>
                <div>{book.type}{book.sample && <span>: <a href={book.sample} target="sample" >Sample</a></span>}</div>
                  {book.detailedSeries && <div>Series: {book.detailedSeries.series} / Book {book.detailedSeries.seriesPosition}</div>}
                  {book.items.map((libraryItem: any) => (
                    <a
                      key={libraryItem.id + libraryItem.library}
                      href={libraryItem.href}
                      className={`book d-block ${libraryItem.isAvailable ? 'book-available' : 'book-not-available'}`}
                      target="library">

                      {libraryItem.isAvailable &&
                        <ListImageBox imgalt={'book available'} imgsrc={check}>
                          <b>{libraryItem.libraryName}</b>
                        </ListImageBox>
                      }

                      {!libraryItem.isAvailable &&
                        <ListImageBox imgalt={'book not available'} imgsrc={time}>
                          <b>{libraryItem.libraryName}</b><br/>
                          Wait in days: {libraryItem.estimatedWaitDays ? libraryItem.estimatedWaitDays: '?' }<> | </>
                          {libraryItem.holdsCount} holds on {libraryItem.ownedCopies} copies
                        </ListImageBox>
                        }
                    </a>
                  ))}
                </ListItemContent>
              </ListItem>
            ))
          }
        </List>
        }
        { searchResults.length === 0 && searchStatus === SearchStatus.Results &&
          <div>No results found! Try searching by book title or author.</div>
        }
    </>
  )
}

export default BookSearch;