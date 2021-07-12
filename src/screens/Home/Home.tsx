import React from 'react';
import MovieList from '../../components/organisms/MovieList';
import {IMovieListProps} from '../../models';

const Home = ({moviesList}: IMovieListProps) => {
  return <MovieList moviesList={moviesList} />;
};

export default Home;
