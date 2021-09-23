import * as React from 'react';
import {Popular} from 'src/models';
import {Container, ErrorWrapper} from 'src/components/common';
import PopularList from './PopularList';

interface Props {
  error: string;
  loading: boolean;
  movies: Popular[];
  loggedIn: boolean;
}

const PopularComponent: React.FC<Props> = ({
  error,
  loading,
  movies,
  loggedIn,
}) => {
  return (
    <Container disableScroll disableSafeArea>
      <ErrorWrapper error={error}>
        <PopularList data={movies} loggedIn={loggedIn} loading={loading} />
      </ErrorWrapper>
    </Container>
  );
};

export default PopularComponent;
