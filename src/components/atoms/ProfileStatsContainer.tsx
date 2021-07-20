import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ProfileStatsContainer = () => {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statsBox}>
        <Text style={[styles.text, styles.numberText]}>50</Text>
        <Text style={[styles.text, styles.subText]}>Liked</Text>
      </View>
      <View style={[styles.statsBox, styles.statsBoxBorder]}>
        <Text style={[styles.text, styles.numberText]}>112</Text>
        <Text style={[styles.text, styles.subText]}>Watched</Text>
      </View>
      <View style={styles.statsBox}>
        <Text style={[styles.text, styles.numberText]}>20</Text>
        <Text style={[styles.text, styles.subText]}>To Watch</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: '',
    color: '#fff',
  },
  titleText: {
    fontSize: 30,
  },
  numberText: {
    fontSize: 24,
  },
  subText: {
    fontSize: 12,
    color: '#FFA31A',
  },
  statsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 32,
  },
  statsBox: {
    alignItems: 'center',
    flex: 1,
  },
  statsBoxBorder: {
    borderColor: '#808080',
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
});

export default ProfileStatsContainer;
