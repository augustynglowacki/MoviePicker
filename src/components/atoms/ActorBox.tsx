import React from 'react';
import {View, StyleSheet} from 'react-native';

const ActorBox = () => {
  return <View style={styles.actorBox} />;
};

const styles = StyleSheet.create({
  actorBox: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'gray',
    margin: 5,
  },
});

export default ActorBox;
