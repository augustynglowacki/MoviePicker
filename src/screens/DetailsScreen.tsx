import React, {useEffect} from 'react';
import {batch, useDispatch, useSelector} from 'react-redux';
import {detailsSelector} from 'src/redux/details/DetailsSlice';
import {
  getMovieActors,
  getTvSeriesDetails,
  getTvSeriesActors,
  getMovieDetails,
} from 'src/redux/details/DetailsActions';
import DetailsComponent from 'src/components/details/Details';
import {
  DetailsScreenNavigationProp,
  DetailsScreenRouteProp,
} from 'src/constants';
import {ButtonsState, ContentType} from 'src/models';
import {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  getFavorite,
  getWatched,
  getWatchlist,
} from 'src/redux/collections/CollectionsActions';
import {collectionsSelector} from 'src/redux/collections/CollectionsSlice';
interface Props {
  route: DetailsScreenRouteProp;
  navigation: DetailsScreenNavigationProp;
}

const DetailsScreen: React.FC<Props> = ({navigation, route}) => {
  const {posterPath, id, contentType} = route.params;
  const isMovie = contentType === ContentType.Movie;
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      batch(() => {
        dispatch(getWatchlist());
        dispatch(getFavorite());
        dispatch(getWatched());
      });
    }, [dispatch]),
  );
  const {watchlist, favorite, watched} = useSelector(collectionsSelector);
  const isInCollections: ButtonsState = {
    favorite: favorite.movies.some(item => item.id === id),
    watchlist: watchlist.movies.some(item => item.id === id),
    watched: watched.movies.some(item => item.id === id),
  };
  const {fetchedMovies, fetchedTvSeries, movieActors, tvSeriesActors} =
    useSelector(detailsSelector);
  const data = isMovie ? fetchedMovies[id] : fetchedTvSeries[id];
  const actors = isMovie ? movieActors : tvSeriesActors;

  const fetchDetails = useCallback(() => {
    if (data) {
      return;
    }
    batch(() => {
      dispatch(isMovie ? getMovieDetails(id) : getTvSeriesDetails(id));
      dispatch(isMovie ? getMovieActors(id) : getTvSeriesActors(id));
    });
  }, [data, dispatch, isMovie, id]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const goBack = () => navigation.goBack();

  return (
    <DetailsComponent
      data={data}
      goBack={goBack}
      posterPath={posterPath}
      movieActors={actors}
      buttonsState={isInCollections}
    />
  );
};

export default DetailsScreen;
