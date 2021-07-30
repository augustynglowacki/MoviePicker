import React from 'react';
import {Movie} from '../../models';
import LikedContentBox from './LikedContentBox';

interface LikedProps {
  // favorited is a better name imo
  movies: Movie[];
}

const LikedComponent = ({movies}: LikedProps) => {
  return <LikedContentBox movies={movies} />;
};

export default LikedComponent;
