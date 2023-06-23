import { useEffect } from 'react';
import { getLibraryInfo } from './utils/DataTools';
import { LibraryMetadataType } from './types'
import { useLibraryContext, ActionType } from './context/LibraryContext';
import { ButtonDelete } from './components/ButtonDelete'
import { List, ListItem, ListItemImage, ListItemContent, ListItemButtons } from './components/List'
import { ListImageBox } from './components/ListImageBox';
import { Panel } from './components/Panel';
import hyperlinkImg from './img/hyperlink.svg';
import libraryImg from './img/library.svg';

function LibraryEditList() {
  const {state, dispatch} = useLibraryContext();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const websiteIds = params.get('websiteIds');
    if (!websiteIds || websiteIds.length === 0) return;
    const libsInUrl = websiteIds.split(',').map((id) => parseInt(id))
    if (libsInUrl.length === 0) return;
    getLibraryInfo(libsInUrl).then((libraries:LibraryMetadataType[]) => {
      libraries.forEach((library) => {
        dispatch({type: ActionType.ADD_LIBRARY, library: library})
      })
    })
  }, []);

  function deleteLibrary(library: LibraryMetadataType) {
    dispatch({type: ActionType.REMOVE_LIBRARY, library: library})
  }


  return (
    <>
      <h2>My Libraries</h2>
      <Panel title='Instructions'>
        { state.libraries.length === 0
          ? <div>You don't have any libraries listed. Click the <b>Find Libraries</b> tab above to add several libraries.<br/>
              <img src={libraryImg} alt='library' className='img-responsive-center' />
          </div>
          : <>
              <p>
                Congrats, you have {state.libraries.length > 1 ? `${state.libraries.length} libraries` : 'one library'} in your list.
                Add a few more libraries or click the <b>Find Books</b> tab to start searching.
              </p>
              <a href={window.location.href}>
                <ListImageBox imgsrc={hyperlinkImg} imgalt='hyperlink'>Bookmark this page to reload your libraries!</ListImageBox>
              </a>
          </>
        }
      </Panel>
      <List>
        {state.libraries.map<React.ReactNode>(library =>
          <ListItem key={library.id}>
            <ListItemImage src={library.logo||''} alt={library.name||''} />
            <ListItemContent className='align-self-center'>
              {(library.link === null)
                ? <span>{library.name}</span>
                : <a href={library.link} target="_blank" rel="noreferrer">{library.name}</a>}
            </ListItemContent>
            <ListItemButtons>
              <ButtonDelete onDelete={() => deleteLibrary(library)}/>
            </ListItemButtons>
          </ListItem>
        )}
      </List>
    </>
  );
}

export default LibraryEditList;