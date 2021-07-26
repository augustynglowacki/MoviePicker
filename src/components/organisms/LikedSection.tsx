import React from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../../assets/theme/colors';
import LikedContentBox from '../molecules/LikedContentBox';

const LikedSection = () => {
  return (
    <View style={styles.wrapper}>
      <LikedContentBox />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.black,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 0,
  },
});

export default LikedSection;
