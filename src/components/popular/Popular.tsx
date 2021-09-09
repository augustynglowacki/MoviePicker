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
    <ErrorWrapper error={error} loading={loading}>
      <Container disableScroll disableSafeArea>
        <PopularList data={movies} loggedIn={loggedIn} />
      </Container>
    </ErrorWrapper>
  );
};

export default PopularComponent;
