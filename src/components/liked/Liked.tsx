import React from 'react';
import {Movie} from 'src/models';
import LikedContentBox from './LikedContentBox';

interface Props {
  movies: Movie[];
}

const LikedComponent: React.FC<Props> = ({movies}) => {
  return <LikedContentBox movies={movies} />;
};

export default LikedComponent;
