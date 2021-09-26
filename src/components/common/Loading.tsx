import React from 'react';
import {StyleSheet} from 'react-native';
import Container from './Container';
import AnimatedLottieView from 'lottie-react-native';
import palette from 'src/styles/palette';

const Loading: React.FC = () => {
  return (
    <Container style={styles.wrapper}>
      <AnimatedLottieView
        testID="loading"
        source={require('../../assets/lottie/popcorn.json')}
        autoPlay
        style={styles.loading}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  loading: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: '15%',
  },
  wrapper: {
    backgroundColor: palette.strongBlack,
  },
});

export default Loading;
