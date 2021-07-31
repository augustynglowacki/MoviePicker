import React from 'react';
import {Movie} from 'src/models';
import LikedContentBox from './LikedContentBox';

interface Props {
  movies: Movie[];
}

const LikedComponent = ({movies}: Props) => {
  return <LikedContentBox movies={movies} />;
};

export default LikedComponent;
