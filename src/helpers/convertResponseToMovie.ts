import {Movie} from '../models';

export const convertResponseToMovie = (data: Movie[]) => {
  const newResult: Movie[] = data.map((movie: Movie) => ({
    id: movie.id,
    title: movie.title,
    vote_average: movie.vote_average,
    poster_path: movie.poster_path,
    overview: movie.overview,
    genre_ids: movie.genre_ids,
  }));
  return newResult;
};
