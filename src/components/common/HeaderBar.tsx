import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import palette from 'src/styles/palette';
import {IconTypes} from 'src/constants';
import {Icon} from '../common';

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
    <View style={styles.titleBar}>
      <TouchableOpacity onPress={leftIcon.onPressFunction}>
        <Icon
          type={leftIcon.type}
          color={palette.white}
          name={leftIcon.name}
          size={26}
        />
      </TouchableOpacity>
      {!!rightIcon && (
        <TouchableOpacity onPress={rightIcon.onPressFunction}>
          <Icon
            type={rightIcon.type}
            color={palette.white}
            name={rightIcon.name}
            size={26}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginHorizontal: 16,
    color: 'white',
  },
});
export default HeaderBar;
