import React from 'react';
import ActorsBox from '../molecules/ActorsBox';
import DiscoveryContentBox from '../molecules/DiscoveryContentBox';
import SearchBox from '../molecules/SearchBox';

const DiscoverySection = () => {
  return (
    <>
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
    </>
  );
};

export default DiscoverySection;
