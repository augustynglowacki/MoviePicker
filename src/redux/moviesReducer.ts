import {Movie} from '../models';

export interface MovieStateWithLoading {
  movies: Movie[];
  loading: boolean;
  error: string;
}

const initialState: MovieStateWithLoading = {
  movies: [{id: 0, title: '', vote_average: 0, poster_path: '', overview: ''}],
  loading: false,
  error: '',
};

type Action = {
  type: 'FETCH_MOVIES_REQUEST' | 'FETCH_MOVIES_SUCCES' | 'FETCH_MOVIES_FAILURE';
  payload: MovieStateWithLoading;
};

const moviesReducer = (
  state: MovieStateWithLoading = initialState,
  {type, payload}: Action,
) => {
  switch (type) {
    case 'FETCH_MOVIES_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'FETCH_MOVIES_SUCCES':
      return {
        movies: payload.movies,
        loading: false,
        error: initialState.error,
      };
    case 'FETCH_MOVIES_FAILURE':
      return {
        movies: initialState.movies,
        loading: false,
        error: payload.error,
      };
    default:
      return state;
  }
};

export default moviesReducer;
