import * as React from 'react';
import {Actor, MovieDetails, TvSeriesDetails} from 'src/models';
import {StyleSheet} from 'react-native';
import palette from 'src/styles/palette';
import {Container, Loading} from 'src/components/common';
import Background from './background/Background';
import Info from './info/Info';

interface Props {
  data: MovieDetails | TvSeriesDetails;
  posterPath: string;
  movieActors: Actor[];
  goBack: () => void;
  addToFavorite: () => void;
}

const DetailsComponent: React.FC<Props> = ({
  posterPath,
  goBack,
  addToFavorite,
  data,
  movieActors,
}) => {
  if (!data) {
    return <Loading />;
  }
  return (
    <Container disableSafeArea style={styles.container}>
      <Background
        goBack={goBack}
        posterPath={posterPath}
        addToFavorite={addToFavorite}
      />
      <Info actors={movieActors} data={data} />
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
