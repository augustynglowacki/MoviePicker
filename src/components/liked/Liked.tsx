import React from 'react';
import {Movie} from '../../models';
import LikedContentBox from './LikedContentBox';

interface LikedProps {
  movies: Movie[];
}

const LikedComponent = ({movies}: LikedProps) => {
  return <LikedContentBox movies={movies} />;
};

export default LikedComponent;
