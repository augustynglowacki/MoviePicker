import React from 'react';
import MovieList from '../../components/organisms/MovieList/MovieList';

interface HomeProps {
  moviesList: Array<string>;
}

const Home = ({moviesList}: HomeProps) => {
  return <MovieList moviesList={moviesList} />;
};

export default Home;
