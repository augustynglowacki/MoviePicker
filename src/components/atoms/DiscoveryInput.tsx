import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DiscoveryInput = () => {
  return (
    <View style={styles.inputBox}>
      <Icon name="search" style={styles.inputIcon} />
      <TextInput
        placeholder="Search for movies"
        style={styles.discoveryInput}
        keyboardAppearance="light"
        clearButtonMode="always"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    flexDirection: 'row',
  },
  discoveryInput: {
    width: '90%',
    height: 30,
    padding: 4,
    color: 'white',
    borderWidth: 1,
    borderLeftWidth: 0,
    backgroundColor: 'grey',
  },
  inputIcon: {
    padding: 8,

    borderWidth: 1,
    backgroundColor: 'grey',
  },
});

export default DiscoveryInput;
