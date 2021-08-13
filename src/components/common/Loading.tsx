import React from 'react';
import {StyleSheet} from 'react-native';
import palette from 'src/styles/palette';
import Container from './Container';
import AnimatedLottieView from 'lottie-react-native';

const Loading: React.FC = () => {
  return (
    <Container style={styles.loadingBox}>
      <AnimatedLottieView
        source={require('../../assets/lottie/popcorn.json')}
        autoPlay
        style={styles.loading}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  loadingBox: {
    backgroundColor: palette.strongBlack,
  },
  loading: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
});

export default Loading;
