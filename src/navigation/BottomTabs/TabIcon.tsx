import React from 'react';
import {StyleSheet} from 'react-native';
import {IconTypes} from 'src/constants';
import palette from 'src/styles/palette';
import {Icon} from 'src/components/common';
import Animated, {AnimatedLayout, FlipInXDown} from 'react-native-reanimated';
const TabIcon = (focused: boolean, name: string, type: IconTypes) => {
  const outline = name + '-outline';
  if (focused) {
    return (
      <Icon
        type={type}
        style={styles.scale}
        color={palette.primary}
        name={name}
        size={26}
      />
    );
  }
  return (
    <AnimatedLayout>
      <Animated.View entering={FlipInXDown.springify().delay(400)}>
        <Icon type={type} color={palette.white} name={outline} size={26} />
      </Animated.View>
    </AnimatedLayout>
  );
};

export default TabIcon;

const styles = StyleSheet.create({
  scale: {
    transform: [{scale: 1.1}],
  },
});
