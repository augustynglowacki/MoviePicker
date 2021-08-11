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
import {ContentType} from 'src/models';
import {useCallback} from 'react';
import {Alert} from 'react-native';
import {useTranslation} from 'react-i18next';
import {userThunkSelector} from 'src/redux/user/UserSlice';
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
  const {
    user: {email},
  } = useSelector(userThunkSelector);

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
  const {t} = useTranslation('common');

  const addToFavorite = () => {
    if (email) {
      // setData();
    } else {
      Alert.alert(t('login'), t('loginSuggestion'), [
        {
          text: t('cancel'),
          onPress: () => {},
        },
        {
          text: t('ok'),
          onPress: () => {},
        },
      ]);
    }
  };

  return (
    <DetailsComponent
      data={data}
      goBack={goBack}
      posterPath={posterPath}
      movieActors={actors}
      addToFavorite={addToFavorite}
    />
  );
};

export default DetailsScreen;
