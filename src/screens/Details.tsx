import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import palette from 'src/styles/palette';
import {useDispatch, useSelector} from 'react-redux';
import {
  getMovieDetails,
  movieDetailsSelector,
} from 'src/redux/movieDetails/movieDetailsSlice';
import {
  getMovieActors,
  getTvSeries,
} from 'src/redux/movieDetails/movieDetailsActions';
import {MovieDetails, TvSeriesDetails} from 'src/models';
import {Container} from 'src/components/common';
import Loading from './Loading';
import BottomWrapper from 'src/components/details/BottomWrapper';
import ContentWrapper from 'src/components/details/ContentWrapper';

const DetailsScreen: React.FC = ({route, navigation}: any) => {
  const [active, setActive] = useState<MovieDetails | TvSeriesDetails>();
  const dispatch = useDispatch();
  const {poster_path, id, isMovie} = route.params;
  const {fetchedMovies, fetchedTvSeries, movieActors} =
    useSelector(movieDetailsSelector);
  const movie = fetchedMovies[id];
  const show = fetchedTvSeries[id];

  useEffect(() => {
    if (isMovie && !fetchedMovies[id]) {
      dispatch(getMovieDetails(id));
      dispatch(getMovieActors(id));
    } else if (!isMovie && !fetchedTvSeries[id]) {
      dispatch(getTvSeries(id));
      dispatch(getMovieActors(id));
    }
  }, [dispatch, id, isMovie, fetchedMovies, fetchedTvSeries]);

  useEffect(() => {
    setActive(movie ? movie : show);
  }, [movie, show]);

  if (!show && !movie) {
    return <Loading />;
  }

  return (
    <Container disableSafeArea style={styles.container}>
      <ContentWrapper navigation={navigation} poster_path={poster_path} />
      <BottomWrapper
        isMovie={isMovie}
        active={active}
        actors={movieActors}
        data={isMovie ? movie : show}
      />
    </Container>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.strongBlack,
  },
});
