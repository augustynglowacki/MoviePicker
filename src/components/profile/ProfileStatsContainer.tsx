import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../../assets/theme/colors';

interface StatBoxProps {
  value: number;
  label: string;
}

const StatBox = ({value, label}: StatBoxProps) => {
  return (
    <>
      <Text style={[styles.text, styles.numberText]}>{value}</Text>
      <Text style={[styles.text, styles.subText]}>{label}</Text>
    </>
  );
};

const ProfileStatsContainer = () => {
  const {t} = useTranslation();
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statsBox}>
        <StatBox value={50} label={t('movies:liked')} />
      </View>
      <View style={[styles.statsBox, styles.statsBoxBorder]}>
        <StatBox value={112} label={t('movies:watched')} />
      </View>
      <View style={styles.statsBox}>
        <StatBox value={22} label={t('movies:toWatch')} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
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
