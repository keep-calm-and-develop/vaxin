import React from 'react';

const initialState = {
    isWeekSearch: false,
    sessions: [],
    centers: [],
    searchParams: {},
    searchType: null,
};

function appReducer(state ,action) {
  switch (action.type) {
    case 'update_isWeekSearch': {
      return { ...state, isWeekSearch: action.payload };
    }
    case 'update_sessions': {
      return { ...state, sessions: action.payload };
    }
    case 'update_centers': {
      return { ...state, centers: action.payload };
    }
    case 'update_searchParams': {
        return { ...state, searchParams: { ...state.searchParams, [action.payload.key]: action.payload.value } };
    }
    case 'update_searchType': {
        return { ...state, searchType: action.payload };
    }
    case 'reset_context': {
        return { ...initialState };
    }
    case 'reset_searchParams': {
        return { ...state, searchParams: {} };
    }
    default:
        console.error('Action not found', action);
        return state;
  }
}

const AppContext = React.createContext(undefined);

const AppContextProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(appReducer, initialState);
  const value = {state, dispatch};
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  const context = React.useContext(AppContext)
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return context;
}

export { AppContextProvider, useAppContext }
