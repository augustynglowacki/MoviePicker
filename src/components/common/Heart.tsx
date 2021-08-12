import React, {useEffect, useRef} from 'react';
import {StyleSheet, Animated, Image} from 'react-native';
import palette from 'src/styles/palette';

const Heart: React.FC = () => {
  const maxValue = 1.4;
  const minValue = 1;
  const duration = 200;
  const beatAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(beatAnim, {
        toValue: maxValue,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(beatAnim, {
        toValue: minValue,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, beatAnim]);

  return (
    <Animated.View
      style={[
        styles.heartIconBox,
        {opacity: fadeAnim, transform: [{scale: beatAnim}]},
      ]}>
      <Image
        source={require('src/assets/images/logo.png')}
        style={styles.logoImage}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  heartIconBox: {
    position: 'absolute',
    alignSelf: 'center',
    shadowOpacity: 1,
    shadowRadius: 50,
    shadowColor: palette.strongBlack,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 50,
  },
  logoImage: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    opacity: 0.95,
  },
});
export default Heart;
