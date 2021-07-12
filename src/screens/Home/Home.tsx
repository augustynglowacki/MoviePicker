import React from 'react';
import MovieList, {
  IMovieListProps,
} from '../../components/organisms/MovieList/MovieList';

const Home = ({moviesList}: IMovieListProps) => {
  return <MovieList moviesList={moviesList} />;
};

export default Home;
