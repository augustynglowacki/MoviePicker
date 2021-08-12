import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, StyleSheet} from 'react-native';
import palette from 'src/styles/palette';
import StatsBox from './StatsBox';

const ProfileStatsContainer: React.FC = () => {
  const {t} = useTranslation('movies');
  return (
    <View style={styles.wrapper}>
      <Text style={styles.titleText}>{t('stats')}</Text>
      <View style={styles.statsContainer}>
        <StatsBox value={50} label={t('favorite')} icon={'heart'} />
        <StatsBox value={112} label={t('watched')} icon={'checkmark'} />
        <StatsBox value={22} label={t('toWatch')} icon={'tv'} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: palette.strongBlack,
    marginVertical: 10,
    borderColor: palette.primary,
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: palette.white,
  },
  statsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    color: palette.primary,
  },
});

export default ProfileStatsContainer;
