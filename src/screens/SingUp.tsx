import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SingUp = () => {
  return (
    <View style={styles.wrapper}>
      <Text>Sing Up</Text>
    </View>
  );
};

export default SingUp;

const styles = StyleSheet.create({
  wrapper: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
