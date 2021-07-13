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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  discoveryInput: {
    width: 200,
    height: 30,
    padding: 4,
    borderWidth: 1,
    borderLeftWidth: 0,
  },
  inputIcon: {
    padding: 3,
    paddingTop: 8,
    paddingBottom: 8,
    borderWidth: 1,
  },
});

export default DiscoveryInput;
