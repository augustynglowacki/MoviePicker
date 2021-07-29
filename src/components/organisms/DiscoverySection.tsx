import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {
  getSearchedActor,
  getSearchedMovies,
  getSearchedTvShows,
} from '../../redux/search/SearchActions';
import {SearchSelector} from '../../redux/search/SearchSlice';
import Container from '../atoms/Container';
import ActorsBox from '../molecules/ActorsBox';
import DiscoveryContentBox from '../molecules/DiscoveryContentBox';
import SearchBox from '../molecules/SearchBox';

const DiscoverySection = () => {
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
      <SearchBox />
      <DiscoveryContentBox
        title={t('movies:movies')}
        data={foundMovies.movies}
        error={foundMovies.error}
        loading={foundMovies.loading}
      />
      <DiscoveryContentBox
        title={t('movies:tvShows')}
        data={foundTvShows.movies}
        error={foundTvShows.error}
        loading={foundTvShows.loading}
      />
      <ActorsBox data={foundActors.actors} error={foundActors.error} />
    </Container>
  );
};

export default DiscoverySection;
