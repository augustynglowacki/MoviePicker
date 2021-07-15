import {Movie} from '../models';
import {
  GET_MOVIES_REJECTED,
  GET_MOVIES_PENDING,
  GET_MOVIES_SUCCES,
  MovieActionTypes,
} from './moviesType';

export interface State {
  movies: Movie[];
  loading: boolean;
  error: string;
}

const initialState: State = {
  movies: [{id: 0, title: '', vote_average: 0, poster_path: '', overview: ''}],
  loading: false,
  error: '',
};

const moviesReducer = (
  state: State = initialState,
  action: MovieActionTypes,
) => {
  switch (action.type) {
    case GET_MOVIES_PENDING:
      return {
        ...state,
        loading: true,
      };
    case GET_MOVIES_SUCCES:
      return {
        ...state,
        movies: action.payload,
        loading: false,
      };
    case GET_MOVIES_REJECTED:
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
