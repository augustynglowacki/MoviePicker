import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import palette from 'src/styles/palette';

interface DotProps {
  index: number;
  activeDotIndex: Animated.SharedValue<number>;
}

const Dot: React.FC<DotProps> = ({activeDotIndex, index}) => {
  const rDotStyle = useAnimatedStyle(() => {
    const isActive = activeDotIndex.value === index;
    return {
      backgroundColor: isActive ? palette.primary : palette.strongBlack,
    };
  });

  return <Animated.View style={[styles.dot, rDotStyle]} />;
};

const styles = StyleSheet.create({
  dot: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: palette.primary,
  },
});

export default Dot;
