import React from 'react';
import MovieList from '../../components/organisms/MovieList/MovieList';

interface HomeProps {
  moviesList: {
    id: Number;
    title: String;
    vote_average: Number;
    poster_path: String;
    overview: String;
  }[];
}

const Home = ({moviesList}: HomeProps) => {
  return <MovieList moviesList={moviesList} />;
};

export default Home;
