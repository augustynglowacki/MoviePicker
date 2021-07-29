import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {
  getSearchedActor,
  getSearchedMovies,
  getSearchedTvShows,
} from '../../redux/search/SearchActions';
import {SearchSelector} from '../../redux/search/SearchSlice';
import ActorsBox from '../actors/ActorList';
import {CollectionContentBox, Container} from '../common';
import DiscoveryBox from './DiscoveryBox';

const DiscoveryComponent = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {query, foundMovies, foundTvShows, foundActors} =
    useSelector(SearchSelector);

  useEffect(() => {
    if (query.length > 3) {
      dispatch(getSearchedMovies());
      dispatch(getSearchedTvShows());
      dispatch(getSearchedActor());
    }
  }, [dispatch, query]);

  return (
    <Container withPadding flexStart withKeyboard>
      <DiscoveryBox />
      <CollectionContentBox
        title={t('movies:movies')}
        data={foundMovies.movies}
        error={foundMovies.error}
        loading={foundMovies.loading}
      />
      <CollectionContentBox
        title={t('movies:tvShows')}
        data={foundTvShows.movies}
        error={foundTvShows.error}
        loading={foundTvShows.loading}
      />
      <ActorsBox data={foundActors.actors} error={foundActors.error} />
    </Container>
  );
};

export default DiscoveryComponent;
