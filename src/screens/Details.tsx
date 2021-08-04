import React, {useEffect, useState} from 'react';
import {batch, useDispatch, useSelector} from 'react-redux';
import {
  getMovieDetails,
  movieDetailsSelector,
} from 'src/redux/movieDetails/movieDetailsSlice';
import {
  getMovieActors,
  getTvSeries,
} from 'src/redux/movieDetails/movieDetailsActions';
import {MovieDetails, TvSeriesDetails} from 'src/models';
import DetailsComponent from 'src/components/details/Details';

interface Props {
  route: any;
  navigation: any;
}
const DetailsScreen: React.FC<Props> = ({route, navigation}) => {
  const [active, setActive] = useState<MovieDetails | TvSeriesDetails>(
    {} as MovieDetails | TvSeriesDetails,
  );
  const dispatch = useDispatch();
  const {poster_path, id, isMovie} = route.params;
  const {fetchedMovies, fetchedTvSeries, movieActors} =
    useSelector(movieDetailsSelector);
  const movie = fetchedMovies[id];
  const show = fetchedTvSeries[id];

  useEffect(() => {
    if (isMovie && !fetchedMovies[id]) {
      batch(() => {
        dispatch(getMovieDetails(id));
        dispatch(getMovieActors(id));
      });
    } else {
      dispatch(getTvSeries(id));
    }
  }, [dispatch, id, isMovie, fetchedMovies]);

  useEffect(() => {
    setActive(movie ? movie : show);
  }, [movie, show]);

  const goBack = () => navigation.goBack();

  return (
    <DetailsComponent
      active={active}
      goBack={goBack}
      poster_path={poster_path}
      movieActors={movieActors}
      isMovie={isMovie}
      movie={movie}
      show={show}
    />
  );
};

export default DetailsScreen;
