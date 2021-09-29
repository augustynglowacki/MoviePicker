import * as React from 'react';
import {Actor, ButtonsState, MovieDetails, TvSeriesDetails} from 'src/models';
import {StyleSheet} from 'react-native';
import palette from 'src/styles/palette';
import {Container, Loading} from 'src/components/common';
import Background from './background/Background';
import Info from './info/Info';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {Easing, SlideInRight} from 'react-native-reanimated';

interface Props {
  data: MovieDetails | TvSeriesDetails;
  posterPath: string;
  movieActors: Actor[];
  goBack: () => void;
  buttonsState: ButtonsState;
}

const DetailsComponent: React.FC<Props> = ({
  posterPath,
  goBack,
  data,
  movieActors,
  buttonsState,
}) => {
  if (!data) {
    return <Loading />;
  }
  return (
    <Container disableSafeArea style={styles.container}>
      <Animated.View
        entering={SlideInRight.delay(0)
          .easing(Easing.bezier(0.42, 0, 1, 1))
          .duration(350)}>
        <Background goBack={goBack} posterPath={posterPath} />
        <SafeAreaView>
          <Info actors={movieActors} data={data} buttonsState={buttonsState} />
        </SafeAreaView>
      </Animated.View>
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
