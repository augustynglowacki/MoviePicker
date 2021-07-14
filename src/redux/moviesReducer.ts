import {Movie, MovieState} from '../models';

const initialState: MovieState = {
  movies: [{id: 0, title: '', vote_average: 0, poster_path: '', overview: ''}],
};

type Action = {type: 'FETCH_MOVIES'; payload: Movie[]};

const moviesReducer = (
  state: MovieState = initialState,
  {type, payload}: Action,
) => {
  switch (type) {
    case 'FETCH_MOVIES':
      return {movies: payload};
    default:
      return state;
  }
};

export default moviesReducer;
