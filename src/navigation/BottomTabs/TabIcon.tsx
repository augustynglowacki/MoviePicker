import React from 'react';
import {StyleSheet} from 'react-native';
import {IconTypes} from 'src/constants';
import palette from 'src/styles/palette';
import {Icon} from 'src/components/common';
import Animated, {FlipInXDown} from 'react-native-reanimated';

const TabIcon = (
  focused: boolean,
  name: string,
  type: IconTypes,
  size?: number,
) => {
  if (!size) {
    size = 26;
  }
  const outline = name + '-outline';
  if (focused) {
    return (
      <Icon
        type={type}
        style={styles.scale}
        color={palette.primary}
        name={name}
        size={size}
      />
    );
  }
  return (
    <Animated.View entering={FlipInXDown.springify().delay(400)}>
      <Icon type={type} color={palette.white} name={outline} size={size} />
    </Animated.View>
  );
};

export default TabIcon;

const styles = StyleSheet.create({
  scale: {
    transform: [{scale: 1.1}],
  },
});
