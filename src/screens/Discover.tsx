import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Discover = () => {
  return (
    <View style={styles.wrapper}>
      <Text> DiscoverScreen </Text>
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
    backgroundColor: 'red',
  },
});
