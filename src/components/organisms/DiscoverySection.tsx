import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
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
  const {query, foundMovies, foundTvShows} = useSelector(SearchSelector);
  useEffect(() => {
    if (query.length > 3) {
      dispatch(getSearchedMovies());
      dispatch(getSearchedTvShows());
    }
  }, [dispatch, query]);
  return (
    <Container>
      <SearchBox />
      <DiscoveryContentBox title="Movies" data={foundMovies.movies} />
      <DiscoveryContentBox title="Tv Shows" data={foundTvShows.movies} />
      <ActorsBox />
    </Container>
  );
};

export default DiscoverySection;
