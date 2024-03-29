import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {FlipInXDown} from 'react-native-reanimated';
import palette from 'src/styles/palette';

interface Props {
  label: string;
}

const ScreenHeader: React.FC<Props> = ({label}) => {
  return (
    <View style={styles.wrapper}>
      <Animated.Text
        style={styles.text}
        entering={FlipInXDown.springify().delay(300)}>
        {label}
      </Animated.Text>
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    marginTop: 10,
    paddingBottom: 16,
    maxWidth: '70%',
  },
  text: {
    color: palette.white,
    fontWeight: 'bold',
    fontSize: 17,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
  },
});
