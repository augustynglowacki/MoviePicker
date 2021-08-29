import React from 'react';
import {StyleSheet} from 'react-native';
import Container from './Container';
import LottieView from 'lottie-react-native';
import Animated, {useAnimatedProps} from 'react-native-reanimated';

const Loading: React.FC = () => {
  //Lottie JS->UI Thread solution from Github - not tested https://github.com/lottie-react-native/lottie-react-native/issues/698
  const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);
  const animatedProps = useAnimatedProps(() => {
    return {};
  });
  //============================================================================

  return (
    <Container>
      <AnimatedLottieView
        testID="loading"
        source={require('../../assets/lottie/popcorn.json')}
        autoPlay
        style={styles.loading}
        animatedProps={animatedProps}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  loading: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: '20%',
  },
});

export default Loading;
