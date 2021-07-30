import {Movie} from 'src/models';
// dont make separated files for each function
export const convertResponseToMovie = (
  data: Movie[],
  isMovie: boolean = true,
) => {
  const newResult: Movie[] = data.map((movie: Movie) => ({
    id: movie.id,
    title: movie.title,
    vote_average: movie.vote_average, //should be in camelCase
    poster_path: movie.poster_path, //should be in camelCase
    overview: movie.overview,
    genre_ids: movie.genre_ids, //should be in camelCase
    isMovie: isMovie,
  }));
  return newResult;
};
