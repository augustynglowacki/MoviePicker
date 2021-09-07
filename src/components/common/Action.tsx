import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from 'react-native-paper';
import {IconTypes} from 'src/constants';
import palette from 'src/styles/palette';
import {Icon} from '.';

interface Props {
  icon: string;
  label: string;
  isActive: boolean;
  onPress: () => void;
}

const Action: React.FC<Props> = ({icon, label, isActive, onPress}: Props) => {
  const outline = icon + '-outline';
  if (isActive) {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.wrapper}>
          <LinearGradient
            colors={['#fab6366a', '#fab8561c']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.linearGradient}
          />
          <Text style={[styles.text, styles.active]} testID="label">
            {label}
          </Text>
          <Icon
            testID="icon"
            type={IconTypes.IONICON}
            name={icon}
            style={styles.icon}
            color={palette.primary}
            size={20}
          />
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.wrapper}>
        <LinearGradient
          testID="icon"
          colors={['#ffffff1c', '#ffffff22']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.linearGradient}
        />
        <Text style={styles.text} testID="label">
          {label}
        </Text>
        <Icon
          testID="icon"
          type={IconTypes.IONICON}
          name={outline}
          style={styles.icon}
          color={palette.white}
          size={20}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Action;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 50,
    height: 35,
    width: 100,
    marginHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    marginRight: 2,
    fontSize: 10,
    fontWeight: 'bold',
    color: palette.white,
  },
  linearGradient: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderRadius: 50,
  },
  active: {
    color: palette.primary,
  },
  icon: {
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
  },
});

// '#ffa31a30',
// '#ffa31a3e',
// '#ffa31a65',
// '#ffa31a78',
// '#ffa31a8f',
// '#ffa31ac5',
// '#ffa31ad3',
// '#ffa31af2',
// '#FFA31A',
