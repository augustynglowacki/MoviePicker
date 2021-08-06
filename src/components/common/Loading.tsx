import React, {useRef} from 'react';
import {StyleSheet, Animated, View} from 'react-native';
import palette from 'src/styles/palette';
import Container from 'src/components/common/Container';
import {Icon} from 'src/components/common';
import {IconTypes} from 'src/constants';

const LoadingScreen: React.FC = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  Animated.loop(
    Animated.spring(rotateAnim, {
      toValue: 1,
      useNativeDriver: true,
    }),
  ).start();

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Container>
      <View style={styles.loadingBox}>
        <Animated.View style={{transform: [{rotate: spin}]}}>
          <Icon
            type={IconTypes.ANT}
            name="loading1"
            size={100}
            color={palette.primary}
          />
        </Animated.View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  loadingBox: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.black,
    position: 'absolute',
    flex: 1,
  },
});

export default LoadingScreen;
