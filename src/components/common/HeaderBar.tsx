import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import palette from 'src/styles/palette';
import {IconTypes} from 'src/constants';
import {Icon} from '.';
import ScreenHeader from './ScreenHeader';

interface Props {
  leftIcon: {
    type: IconTypes;
    name: string;
    onPressFunction: () => void;
  };
  rightIcon?: {
    type: IconTypes;
    name: string;
    onPressFunction: () => void;
  };
  title?: string;
}

const HeaderBar: React.FC<Props> = ({leftIcon, rightIcon, title}) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={leftIcon.onPressFunction}>
        <View style={styles.icon}>
          <Icon
            style={styles.shadow}
            type={leftIcon.type}
            color={palette.white}
            name={leftIcon.name}
            size={28}
          />
        </View>
      </TouchableOpacity>
      {!!title && (
        <View style={styles.title}>
          <ScreenHeader label={title} />
        </View>
      )}
      {!!rightIcon && (
        <TouchableOpacity onPress={rightIcon.onPressFunction}>
          <View style={styles.icon}>
            <Icon
              style={styles.shadow}
              type={rightIcon.type}
              color={palette.white}
              name={rightIcon.name}
              size={28}
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  shadow: {
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.795)',
  },
  title: {
    width: ' 100%',
    alignItems: 'center',
    position: 'absolute',
  },
});
export default HeaderBar;
