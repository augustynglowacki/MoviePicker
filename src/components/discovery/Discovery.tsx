import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {
  getSearchedActor,
  getSearchedMovies,
  getSearchedTvSeries,
} from 'src/redux/search/SearchActions';
import {SearchSelector} from 'src/redux/search/SearchSlice';
import ActorList from '../actors/ActorList';
import {CollectionContentBox, Container} from '../common';
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
    <Container withPadding flexStart withKeyboard>
      <DiscoveryBox />
      <CollectionContentBox
        title={t('movies')}
        data={foundMovies.movies}
        error={foundMovies.error}
        loading={foundMovies.loading}
      />
      <CollectionContentBox
        title={t('tvSeries')}
        data={foundTvSeries.movies}
        error={foundTvSeries.error}
        loading={foundTvSeries.loading}
      />
      <ActorList data={foundActors.actors} error={foundActors.error} />
    </Container>
  );
};

export default DiscoveryComponent;
