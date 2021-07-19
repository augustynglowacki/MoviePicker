import React from 'react';
import Container from '../atoms/Container';
import ActorsBox from '../molecules/ActorsBox';
import DiscoveryContentBox from '../molecules/DiscoveryContentBox';
import SearchBox from '../molecules/SearchBox';

const DiscoverySection = () => {
  return (
    <Container>
      <SearchBox />
      <DiscoveryContentBox
        title="Movies"
        data={[{title: 'a', poster_path: '2', id: 0, overview: 'asd'}]}
      />
      <DiscoveryContentBox
        title="Tv Shows"
        data={[{title: 'a', poster_path: '2', id: 0, overview: 'asd'}]}
      />
      <ActorsBox />
    </Container>
  );
};

export default DiscoverySection;
