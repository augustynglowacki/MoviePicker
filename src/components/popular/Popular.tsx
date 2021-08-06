import * as React from 'react';
import {Movie} from 'src/models';
import {Container, ErrorWrapper} from 'src/components/common';
import MovieList from './MovieList';

interface Props {
  error: string;
  loading: boolean;
  movies: Movie[];
}

const PopularComponent: React.FC<Props> = ({error, loading, movies}) => {
  return (
    <ErrorWrapper error={error} loading={loading}>
      <Container disableScroll disableSafeArea>
        <MovieList moviesList={movies} />
      </Container>
    </ErrorWrapper>
  );
};

export default PopularComponent;
