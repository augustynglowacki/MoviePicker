import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../../assets/theme/colors';

const ProfileStatsContainer = () => {
  const {i18n} = useTranslation();
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statsBox}>
        <Text style={[styles.text, styles.numberText]}>50</Text>
        <Text style={[styles.text, styles.subText]}>
          {i18n.t('movies:liked')}
        </Text>
      </View>
      <View style={[styles.statsBox, styles.statsBoxBorder]}>
        <Text style={[styles.text, styles.numberText]}>112</Text>
        <Text style={[styles.text, styles.subText]}>
          {i18n.t('movies:watched')}
        </Text>
      </View>
      <View style={styles.statsBox}>
        <Text style={[styles.text, styles.numberText]}>20</Text>
        <Text style={[styles.text, styles.subText]}>
          {i18n.t('movies:toWatch')}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    //fontFamily: '',
    color: colors.white,
  },
  titleText: {
    fontSize: 30,
  },
  numberText: {
    fontSize: 24,
  },
  subText: {
    fontSize: 12,
    color: colors.primary,
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
    borderColor: colors.grey,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
});

export default ProfileStatsContainer;
