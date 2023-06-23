import { useState, useEffect } from 'react';
import { LibraryDetailsType } from './types'
import { ButtonSelectToggle } from './components/ButtonSelectToggle';
import { List, ListItem, ListItemImage, ListItemContent, ListItemButtons } from './components/List'
import { Panel } from './components/Panel';
import { SearchBox } from './components/SearchBox';
import { Toast } from './components/Toast';
import { getLibraryInfo, findLibraries } from './utils/DataTools'
import { useLibraryContext, ActionType } from './context/LibraryContext';

function LibrarySearch() {
  const [libsearchQuery, setLibsearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [matchingLibraries, setMatchingLibraries] = useState<LibraryDetailsType[]>([]);
  const [controller, setController] = useState<AbortController>(new AbortController());
  const {state, dispatch} = useLibraryContext();

  useEffect(() => {
    if (libsearchQuery.length < 3) {
      setSearchStatus('')
      controller.abort();
      return setMatchingLibraries([]);
    } else {
      let instanceController = controller;
      if (instanceController.signal.aborted) {
        instanceController = new AbortController();
        setController(instanceController);
      }
      setSearchStatus('Searching...')
      findLibraries(libsearchQuery, instanceController.signal)
        .then((libraries: LibraryDetailsType[]) => {
          setSearchStatus(libraries.length ? `Matching Libraries (${libraries.length})` : 'No libraries found! Try searching by library name, city, or ZIP Code.')
          setMatchingLibraries(libraries);
        })
    }
  }, [libsearchQuery]); //controller

  const selectLibrary = async (websiteId: number) => {
    controller.abort();
    setToastMessage('Adding library...');
    const libraryDetails = await getLibraryInfo([websiteId]);
    if (libraryDetails.length > 0) {
      dispatch({type: ActionType.ADD_LIBRARY, library: libraryDetails[0]})
      setToastMessage(`Added ${libraryDetails[0].name}! Bookmark this page to reload your libraries.`);
    } else {
      setToastMessage(`Error adding library`);
    }
  }

  function removeLibrary(websiteId: number) {
    const library = state.libraries.find((library) => library.websiteId === websiteId);
    if (library) {
      dispatch({type: ActionType.REMOVE_LIBRARY, library: library})
      setToastMessage(`Removed ${library.name} from your selected libraries.`);
    }
  }

  const isSelected = (websiteId: number) => {
    return state.libraries.some((library) => library.websiteId === websiteId);
  }

  return (
    <>
      <Toast message={toastMessage} />
      <h2>Find Libraries</h2>
      <Panel title='Search'>
        <SearchBox
          label='Library Search:'
          value={libsearchQuery}
          placeholder="Library name, city, or zip"
          onChange={setLibsearchQuery}
        />
      </Panel>
      <div className='libsearch-results'>
        <div className="libsearch-status">{searchStatus}</div>
        <List>
          {matchingLibraries.map((library) => (
            <ListItem key={library.id} className={isSelected(library.websiteId)?'selected':''}>
              <ListItemImage src={library.logo} alt={library.name} />
              <ListItemContent>
                <h3 className="margin-0">{library.name}</h3>
                {library.name !== library.locationName && <div>{library.locationName}</div>}
                <div>{library.address}</div>
                <div>{library.city}, {library.region} {library.countryCode}</div>
                {library.branchIds.length > 1 && <div>(1 of {library.branchIds.length} branches)</div>}
              </ListItemContent>
              <ListItemButtons>
                <ButtonSelectToggle
                  onRemove={() => removeLibrary(library.websiteId)}
                  onAdd={() => selectLibrary(library.websiteId)}
                  selected={isSelected(library.websiteId)}
                  title='Library'
                />
              </ListItemButtons>
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
}

export default LibrarySearch;
