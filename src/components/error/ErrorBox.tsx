import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import palette from 'src/styles/palette';
import Icon from '../common/Icon';
import {IconTypes} from 'src/constants';

interface Props {
  errorMsg: string;
}

const ErrorBox: React.FC<Props> = ({errorMsg}) => {
  return (
    <View style={styles.errorBox}>
      <Icon
        type={IconTypes.FA5}
        name="times-circle-o"
        size={100}
        color={palette.danger}
      />
      <Text style={styles.errorText}>{errorMsg}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: palette.danger,
    fontSize: 22,
  },
});

export default ErrorBox;
