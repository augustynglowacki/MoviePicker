import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Liked = () => {
  return (
    <View style={styles.wrapper}>
      <Text>Liked</Text>
    </View>
  );
};

export default Liked;

const styles = StyleSheet.create({
  wrapper: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
