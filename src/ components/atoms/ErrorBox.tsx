import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ErrorBox = () => {
  return (
    <View style={styles.errorBox}>
      <Icon name="times-circle-o" color="#f23535" size={100} />
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
    color: '#f23535',
    fontSize: 22,
  },
});

export default ErrorBox;
