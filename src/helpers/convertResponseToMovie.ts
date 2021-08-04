import {genres} from 'src/api/genres';
import {Movie} from 'src/models';
import {MovieApi} from 'src/models/movie';

export const convertResponseToMovie = (
  data: MovieApi[],
  isMovie: boolean = true,
) => {
  const newResult: Movie[] = data.map(
    ({id, title, poster_path, vote_average, overview, genre_ids}) => ({
      id: id,
      title: title,
      poster_path: poster_path,
      vote_average: vote_average,
      overview: overview,
      genres: genre_ids.map(genre => genres[genre]),
      isMovie: isMovie,
    }),
  );
  return newResult;
};
