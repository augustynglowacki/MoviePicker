import React, {useEffect} from 'react';
import {batch, useDispatch, useSelector} from 'react-redux';
import {getMovieDetails, detailsSelector} from 'src/redux/details/DetailsSlice';
import {
  getMovieActors,
  getTvSeriesDetails,
  getTvSeriesActors,
} from 'src/redux/details/DetailsActions';
import DetailsComponent from 'src/components/details/Details';
import {
  DetailsScreenNavigationProp,
  DetailsScreenRouteProp,
} from 'src/constants';
import {ContentType} from 'src/models';
import {useCallback} from 'react';
interface Props {
  route: DetailsScreenRouteProp;
  navigation: DetailsScreenNavigationProp;
}

const DetailsScreen: React.FC<Props> = ({navigation, route}) => {
  const {posterPath, id, contentType} = route.params;
  const isMovie = contentType === ContentType.Movie;
  const dispatch = useDispatch();
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
    />
  );
};

export default DetailsScreen;
