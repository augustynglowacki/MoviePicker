import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {IconTypes} from 'src/constants';
import palette from 'src/styles/palette';
import {Icon} from '../common';

interface Props {
  text: string;
  navigateTo: () => void;
}

const SettingOptionBox: React.FC<Props> = ({text, navigateTo}) => {
  return (
    <TouchableOpacity onPress={navigateTo}>
      <View style={styles.optionBox}>
        <Text style={styles.optionHeader}>{text}</Text>
        <View>
          <Icon
            type={IconTypes.MATERIAL}
            color={palette.primary}
            name="keyboard-arrow-right"
            size={26}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionBox: {
    backgroundColor: palette.darkGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginTop: 5,
  },
  optionHeader: {
    color: palette.white,
  },
});

export default SettingOptionBox;
