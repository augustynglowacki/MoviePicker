import React from 'react';
import {StyleSheet, View} from 'react-native';
import DiscoveryInput from '../components/atoms/DiscoveryInput';

const Discover = () => {
  return (
    <View style={styles.wrapper}>
      <DiscoveryInput />
    </View>
  );
};

export default Discover;

//temporary styles
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
