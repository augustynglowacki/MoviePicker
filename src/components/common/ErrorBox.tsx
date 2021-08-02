import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../assets/theme/colors';

interface Props {
  errorMsg: string;
}

const ErrorBox: React.FC<Props> = ({errorMsg}) => {
  return (
    <View style={styles.errorBox}>
      <Icon name="times-circle-o" color={colors.danger} size={100} />
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
    color: colors.danger,
    fontSize: 22,
  },
});

export default ErrorBox;
