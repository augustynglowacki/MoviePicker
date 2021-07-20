import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getSearchedMovies} from '../../redux/search/SearchActions';
import {SearchSelector} from '../../redux/search/SearchSlice';
import Container from '../atoms/Container';
import ActorsBox from '../molecules/ActorsBox';
import DiscoveryContentBox from '../molecules/DiscoveryContentBox';
import SearchBox from '../molecules/SearchBox';

const DiscoverySection = () => {
  const dispatch = useDispatch();
  const {query, foundMovies} = useSelector(SearchSelector);
  useEffect(() => {
    if (query.length > 3) {
      dispatch(getSearchedMovies());
    }
  }, [dispatch, query]);
  return (
    <Container>
      <SearchBox />

      <DiscoveryContentBox title="Movies" data={foundMovies.movies} />
      <DiscoveryContentBox
        title="Tv Shows"
        data={[{title: 'a', poster_path: '2', id: 0, overview: 'asd'}]}
      />
      <ActorsBox />
    </Container>
  );
};

export default DiscoverySection;
