import {Movie} from 'src/models';
export const genres = {
  12: 'Adventure',
  14: 'Fantasy',
  16: 'Animation',
  18: 'Drama',
  27: 'Horror',
  28: 'Action',
  35: 'Comedy',
  36: 'History',
  37: 'Western',
  53: 'Thriller',
  80: 'Crime',
  99: 'Documentary',
  878: 'Science Fiction',
  9648: 'Mystery',
  10402: 'Music',
  10749: 'Romance',
  10751: 'Family',
  10752: 'War',
  10770: 'TV Movie',
};

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
