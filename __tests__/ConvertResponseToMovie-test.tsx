import {convertResponseToMovie} from '../src/helpers/convertResponse';
import {Movie} from '../src/models';

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
      title: '',
      poster_path: '',
      id: 0,
      overview: '',
      genre_ids: [],
      vote_average: 0,
    },
  ];
  expect(convertResponseToMovie(response)).toStrictEqual(convertedResponse);
});
