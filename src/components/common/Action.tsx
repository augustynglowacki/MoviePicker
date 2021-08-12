import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {IconTypes} from 'src/constants';
import palette from 'src/styles/palette';
import Icon from './Icon';

interface Props {
  icon: string;
  label: string;
  isActive: boolean;
  onPress: () => void;
}

const Action: React.FC<Props> = ({icon, label, isActive, onPress}) => {
  const outline = icon + '-outline';

  return (
    <TouchableOpacity onPress={onPress} style={styles.box}>
      <Icon
        style={styles.icon}
        name={isActive ? icon : outline}
        type={IconTypes.IONICON}
        size={38}
        color={isActive ? palette.primary : palette.white}
      />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Action;

export const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
  },
  icon: {
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
  },
  text: {
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    color: palette.white,
    fontSize: 11,
    fontWeight: 'bold',
  },
});
