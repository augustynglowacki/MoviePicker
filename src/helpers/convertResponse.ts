import {genres} from 'src/api/genres';
import {ContentType, Movie, MovieApi, Popular, PopularApi} from 'src/models';

export const convertToMovie = (data: MovieApi[], isMovie: boolean): Movie[] => {
  return data.map(({id, poster_path}) => ({
    id: id,
    posterPath: poster_path,
    contentType: isMovie ? ContentType.Movie : ContentType.TvSeries,
  }));
};

export const convertToPopular = (
  data: PopularApi[],
  isMovie: boolean,
): Popular[] => {
  return data.map(
    ({id, title, poster_path, vote_average, overview, genre_ids}) => ({
      id: id,
      title: title,
      posterPath: poster_path,
      voteAverage: vote_average,
      overview: overview,
      genres: genre_ids.map(genre => genres[genre]),
      contentType: isMovie ? ContentType.Movie : ContentType.TvSeries,
    }),
  );
};
