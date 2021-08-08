import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import palette from 'src/styles/palette';
import {IconTypes} from 'src/constants';
import {Icon} from '.';
import {SafeAreaView} from 'react-native-safe-area-context';

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
    <SafeAreaView style={styles.wrapper}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});
export default HeaderBar;
