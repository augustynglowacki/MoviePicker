import {Movie} from '../../models';
import * as moviesTypes from './moviesTypes';

interface State {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  movies: [],
  loading: false,
  error: null,
};

export const moviesReducer = (
  state: State = initialState,
  action: moviesTypes.MovieActionTypes,
) => {
  switch (action.type) {
    case moviesTypes.GET_MOVIES_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case moviesTypes.GET_MOVIES_SUCCESS:
      return {
        ...state,
        movies: action.payload,
        loading: false,
        error: null,
      };
    case moviesTypes.GET_MOVIES_REJECTED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default moviesReducer;
