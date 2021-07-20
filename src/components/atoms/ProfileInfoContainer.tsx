import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../../assets/theme/colors';

const ProfileInfoContainer = () => {
  return (
    <View style={styles.infoContainer}>
      <Text style={[styles.text, styles.titleText]}>Mdevelopers</Text>
      <Text style={[styles.text, styles.subText]}>Premium</Text>
    </View>
  );
};

export default ProfileInfoContainer;
const styles = StyleSheet.create({
  infoContainer: {
    alignItems: 'center',
  },
  text: {
    //fontFamily: '',
    color: colors.white,
  },
  titleText: {
    fontSize: 30,
  },
  subText: {
    fontSize: 12,
    color: colors.primary,
  },
});
