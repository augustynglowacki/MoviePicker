import {convertToMovie} from '../src/helpers/convertResponse';
import {ContentType, Movie} from '../src/models';

test('Checks if Conversion to array of movies is succeeded', () => {
  const response = [
    {
      title: '',
      poster_path: '',
      id: 0,
      overview: '',
      genre_ids: [],
      actors: '',
      vote_average: 0,
      poster: '',
    },
  ];
  const convertedResponse: Movie[] = [
    {
      id: 0,
      posterPath: '',
      contentType: ContentType.Movie,
    },
  ];
  expect(convertToMovie(response, true)).toStrictEqual(convertedResponse);
});
