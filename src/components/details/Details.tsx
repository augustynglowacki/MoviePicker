import * as React from 'react';
import {Actor, MovieDetails, TvSeriesDetails} from 'src/models';
import {StyleSheet} from 'react-native';
import palette from 'src/styles/palette';
import {Container} from 'src/components/common';
import Loading from 'src/screens/Loading';
import BackgroundWrapper from './BackgroundWrapper';
import InfoWrapper from './InfoWrapper';

interface Props {
  active: MovieDetails | TvSeriesDetails;
  poster_path: string;
  isMovie: boolean;
  movie: MovieDetails;
  show: TvSeriesDetails;
  movieActors: Actor[];
  goBack: () => void;
}

const DetailsComponent: React.FC<Props> = ({
  poster_path,
  goBack,
  active,
  isMovie,
  movie,
  show,
  movieActors,
}) => {
  if (!show && !movie) {
    return <Loading />;
  }
  return (
    <Container disableSafeArea style={styles.container}>
      <BackgroundWrapper goBack={goBack} poster_path={poster_path} />
      <InfoWrapper
        active={active}
        actors={movieActors}
        isMovie={isMovie}
        movie={movie}
        show={show}
      />
    </Container>
  );
};

export default DetailsComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.strongBlack,
  },
});
