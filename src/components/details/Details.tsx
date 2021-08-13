import * as React from 'react';
import {Actor, MovieDetails, TvSeriesDetails} from 'src/models';
import {StyleSheet} from 'react-native';
import palette from 'src/styles/palette';
import {Container, Loading} from 'src/components/common';
import Background from './background/Background';
import Info from './info/Info';
import {SafeAreaView} from 'react-native-safe-area-context';

interface Props {
  data: MovieDetails | TvSeriesDetails;
  posterPath: string;
  movieActors: Actor[];
  goBack: () => void;
  addToWatchlist: () => void;
}

const DetailsComponent: React.FC<Props> = ({
  posterPath,
  goBack,
  addToWatchlist,
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
        addToWatchlist={addToWatchlist}
      />
      <SafeAreaView>
        <Info actors={movieActors} data={data} />
      </SafeAreaView>
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
