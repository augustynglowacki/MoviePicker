import * as React from 'react';
import {Popular} from 'src/models';
import {Container, ErrorWrapper} from 'src/components/common';
import {PopularListView} from './PopularListView';

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
        <PopularListView
          movies={movies}
          loading={loading}
          loggedIn={loggedIn}
        />
      </ErrorWrapper>
    </Container>
  );
};

export default PopularComponent;
