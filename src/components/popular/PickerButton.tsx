import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from 'react-native-paper';
import {IconTypes} from 'src/constants';
import palette from 'src/styles/palette';
import Icon from '../common/Icon';

interface Props {
  onPress: () => void;
  state: boolean;
}

const PickerButton: React.FC<Props> = ({onPress, state}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.box} disabled={state}>
      <LinearGradient
        colors={[
          'rgba(0,0,0,0.05)',
          'rgba(0,0,0,0.1)',
          'rgba(0,0,0,0.1)',
          'rgba(0,0,0,0.1)',
          'rgba(0,0,0,0.05)',
        ]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.linearGradient}
      />
      <Icon
        testID="icon"
        style={[styles.icon, state ? styles.filledIcon : styles.outlinedIcon]}
        name={state ? 'tv' : 'tv-outline'}
        type={IconTypes.IONICON}
        size={42}
        color={state ? palette.primary : palette.white}
      />
      <Text testID="label" style={styles.text}>
        {state ? 'Saved to Watchlist!' : 'Save to Watchlist!'}
      </Text>
    </TouchableOpacity>
  );
};

export default PickerButton;
const {width} = Dimensions.get('screen');
const buttonWidth = width * 0.69;
const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: buttonWidth,
    maxWidth: buttonWidth,
    minWidth: buttonWidth,
    height: 55,
    borderRadius: 16,
  },
  linearGradient: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    borderRadius: 16,
  },
  icon: {
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
  },
  //Icon gets slightly larger after click, styles below are needed for the icon to stay in the same spot after clicking.
  filledIcon: {
    left: 32,
  },
  outlinedIcon: {
    left: 30,
  },
  //Text styled using left not right, because by using left the text starts in the same spot after clicking.
  text: {
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    color: palette.white,
    fontSize: 16,
    position: 'absolute',
    left: 84,
  },
});
