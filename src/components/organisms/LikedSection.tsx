import React from 'react';
import {Movie} from '../../models';
import LikedContentBox from '../molecules/LikedContentBox';

interface LikedProps {
  movies: Movie[];
}

const LikedSection = ({movies}: LikedProps) => {
  return <LikedContentBox movies={movies} />;
};

export default LikedSection;
