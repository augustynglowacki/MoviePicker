import {genres} from 'src/api/genres';
import {ContentType, Movie} from 'src/models';
import {MovieApi} from 'src/models/movies';

export const convertResponseToMovie = (
  data: MovieApi[],
  isMovie: boolean,
): Movie[] => {
  return data.map(
    ({id, title, poster_path, vote_average, overview, genre_ids}) => ({
      id: id,
      title: title,
      posterPath: poster_path,
      voteAverage: vote_average,
      overview: overview,
      genres: genre_ids.map(genre => genres[genre]),
      contentType: isMovie ? ContentType.Movie : ContentType.TvSerie,
    }),
  );
};
