import React from 'react';
import {View, StyleSheet} from 'react-native';

import LikedContentBox from '../components/molecules/LikedContentBox';

const Liked = () => {
  return (
    <View style={styles.wrapper}>
      <LikedContentBox />
    </View>
  );
};

export default Liked;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 0,
  },
});
