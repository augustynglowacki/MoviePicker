import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getSearchedActor,
  getSearchedMovies,
  getSearchedTvSeries,
} from 'src/redux/search/SearchActions';
import {SearchSelector} from 'src/redux/search/SearchSlice';
import palette from 'src/styles/palette';
import Actors from '../actors/Actors';
import {Collection, Container} from '../common';
import DiscoveryBox from './DiscoveryBox';

const DiscoveryComponent: React.FC = () => {
  const MIN_QUERY_LENGTH = 2;
  const dispatch = useDispatch();
  const {t} = useTranslation('movies');
  const {query, foundMovies, foundTvSeries, foundActors} =
    useSelector(SearchSelector);

  useEffect(() => {
    if (query.length > MIN_QUERY_LENGTH) {
      dispatch(getSearchedMovies());
      dispatch(getSearchedTvSeries());
      dispatch(getSearchedActor());
    }
  }, [dispatch, query]);

  return (
    <Container flexStart withKeyboard style={styles.wrapper}>
      <DiscoveryBox />
      <Collection
        title={t('movies')}
        data={foundMovies.movies}
        error={foundMovies.error}
        loading={foundMovies.loading}
      />
      <Collection
        title={t('tvSeries')}
        data={foundTvSeries.movies}
        error={foundTvSeries.error}
        loading={foundTvSeries.loading}
      />
      <Actors data={foundActors.actors} error={foundActors.error} />
    </Container>
  );
};

export default DiscoveryComponent;

const styles = StyleSheet.create({
  wrapper: {backgroundColor: palette.strongBlack},
});
