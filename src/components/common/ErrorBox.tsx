import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import palette from 'src/styles/palette';

const ErrorBox: React.FC = () => {
  return (
    <View style={styles.errorBox}>
      <Icon name="times-circle-o" color={palette.danger} size={100} />
      <Text style={styles.errorText}>Couldn't load movies</Text>
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
