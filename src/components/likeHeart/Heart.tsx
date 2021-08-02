import React, {useEffect, useRef} from 'react';
import {StyleSheet, Animated} from 'react-native';
import palette from 'src/styles/palette';
import {Icon} from '../common';
import {IconTypes} from '../common/Icons';

const Heart: React.FC = () => {
  const maxValue = 1.5;
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
      <Icon
        type={IconTypes.FA}
        color={palette.primary}
        name="heart"
        size={200}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  heartIconBox: {
    position: 'absolute',
  },
});
export default Heart;
