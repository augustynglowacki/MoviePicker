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
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

interface DetailsScreenParams {
  poster_path: string;
  isMovie: boolean;
  id: number;
}

type RootStackParamList = {
  Details: DetailsScreenParams;
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>;
interface Props {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
}

const DetailsScreen: React.FC<Props> = ({navigation, route}) => {
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
