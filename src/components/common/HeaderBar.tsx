import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import palette from 'src/styles/palette';
import {IconTypes} from 'src/constants';
import {Icon} from '.';

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
}

const HeaderBar: React.FC<Props> = ({leftIcon, rightIcon}) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={leftIcon.onPressFunction}>
        <View style={styles.icon}>
          <Icon
            type={leftIcon.type}
            color={palette.white}
            name={leftIcon.name}
            size={28}
          />
        </View>
      </TouchableOpacity>
      {!!rightIcon && (
        <TouchableOpacity onPress={rightIcon.onPressFunction}>
          <View style={styles.icon}>
            <Icon
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
});
export default HeaderBar;
