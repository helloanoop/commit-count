import { useReducer } from 'react';

const initialState = {
  repo: '',
  table: {
    repo: '',
    rows: [],
  },
  loading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_REPO':
      return { ...state, repo: action.payload };
    case 'SEARCH':
      return { ...state, loading: true };
    case 'SEARCH_SUCCESS':
      return {
        ...state,
        table: {
          repo: state.repo,
          rows: action.payload,
        },
        loading: false
      };
    case 'SEARCH_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const useStore = () => useReducer(reducer, initialState);

export default useStore;
