import React from "react";
import { LibraryMetadataType } from '../types'

export interface AppState {
  libraries: LibraryMetadataType[]
}

export const initialState: AppState = {
  libraries: []
}

const syncPushState = (libraries: LibraryMetadataType[]) => {
  if (window.history.pushState) {
    var newurl =`${window.location.protocol}//${window.location.host}${window.location.pathname}?websiteIds=${libraries.map((lib) => lib.websiteId).join(',')}`;
    window.history.pushState({path:newurl},'',newurl);
  }
}

export interface ILibraryContext {
  state: AppState
  dispatch: React.Dispatch<ContextActionType>
}

const LibraryContext = React.createContext<ILibraryContext>({
  state: {
    libraries: []
  },
  dispatch: (e) => {}
})

export enum ActionType {
  ADD_LIBRARY = 'ADD_LIBRARY',
  REMOVE_LIBRARY = 'REMOVE_LIBRARY'
}

export type ContextActionType = {
  type: ActionType
  library: LibraryMetadataType
}

const libraryReducer = (
  state: AppState,
  action: ContextActionType
): typeof initialState => {

  const selectedLibrary = action.library

  switch (action.type) {

    case 'ADD_LIBRARY': {
      if (selectedLibrary.id) {
        const o = {
          libraries: [
            ...state.libraries.filter(
              v => v.id !== selectedLibrary.id
            ),
            selectedLibrary
          ]
        }
        syncPushState(o.libraries)
        return o
      }
      return {
        ...state
      }
    }
    case 'REMOVE_LIBRARY': {
      if (selectedLibrary.id) {
        const o = {
          libraries: [
            ...state.libraries.filter(
              v => v.id !== selectedLibrary.id
            )
          ]
        }
        syncPushState(o.libraries)
        return o
      }
      return {
        ...state
      }
    }
    default:
      throw new Error()
  }

}

interface Props {
  children: React.ReactNode;
}

const LibraryContextProvider = ({children} : Props) => {
  const [state, dispatch] = React.useReducer(libraryReducer, initialState as AppState);
  return (
    <LibraryContext.Provider value={{state, dispatch }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibraryContext = () => {
  const libraryContext = React.useContext(LibraryContext);
  if (libraryContext === null) {
    throw new Error("useLibraryContext must be used within a LibraryContextProvider");
  }
  return libraryContext;
}

export { LibraryContext, LibraryContextProvider };