import React from 'react';
import {StyleSheet} from 'react-native';
import Container from './Container';
import AnimatedLottieView from 'lottie-react-native';

const Loading: React.FC = () => {
  return (
    <Container>
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
});

export default Loading;
