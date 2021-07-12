import React from 'react';
import MovieList from '../../components/organisms/MovieList/MovieList';

interface HomeProps {
  moviesList: Array<string>;
}

const Home: React.FC<HomeProps> = ({moviesList}) => {
  return <MovieList moviesList={moviesList} />;
};

export default Home;
