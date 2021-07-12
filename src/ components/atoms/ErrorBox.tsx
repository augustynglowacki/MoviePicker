import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ErrorBox = () => {
  return (
    <View style={styles.errorBox}>
      <Text>An error occured</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorBox: {
    padding: 40,
    borderWidth: 1,
    borderRadius: 30,
  },
});

export default ErrorBox;
