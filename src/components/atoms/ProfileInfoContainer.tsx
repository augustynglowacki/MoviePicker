import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

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
    fontFamily: '',
    color: '#fff',
  },
  titleText: {
    fontSize: 30,
  },
  subText: {
    fontSize: 12,
    color: '#FFA31A',
  },
});
