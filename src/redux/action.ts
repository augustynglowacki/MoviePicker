import {MovieState} from '../models';

export const fetchMovies = (newresult: MovieState) => {
  return {
    type: 'FETCH_MOVIES',
    payload: newresult,
  };
};
