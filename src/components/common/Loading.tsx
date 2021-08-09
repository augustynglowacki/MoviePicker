import React from 'react';
import {StyleSheet} from 'react-native';
import palette from 'src/styles/palette';
import {ActivityIndicator} from 'react-native-paper';
import Container from './Container';
const LoadingScreen: React.FC = () => {
  return (
    <Container style={styles.loadingBox}>
      <ActivityIndicator animating={true} color={palette.primary} size={70} />
    </Container>
  );
};

const styles = StyleSheet.create({
  loadingBox: {
    backgroundColor: palette.strongBlack,
  },
});

export default LoadingScreen;
