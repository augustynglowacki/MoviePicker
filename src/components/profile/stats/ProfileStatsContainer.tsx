import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, StyleSheet} from 'react-native';
import {CollectionContent} from 'src/models';
import palette from 'src/styles/palette';
import StatsBox from './StatsBox';

interface Props {
  collectionContent: CollectionContent[];
  isExplore?: boolean;
}

const ProfileStatsContainer: React.FC<Props> = ({
  collectionContent,
  isExplore,
}) => {
  const {t} = useTranslation('movies');
  return (
    <View style={styles.wrapper}>
      <Text style={styles.titleText}>{t('stats')}</Text>
      <View style={styles.statsContainer}>
        {isExplore ? (
          <View style={styles.mockStatsBox}>
            <Text>&nbsp;</Text>
          </View>
        ) : (
          <>
            <StatsBox
              value={collectionContent[0].collection.length}
              label={t('favorite')}
              icon={'heart'}
            />
            <StatsBox
              value={collectionContent[1].collection.length}
              label={t('watchlist')}
              icon={'tv'}
            />
            <StatsBox
              value={collectionContent[2].collection.length}
              label={t('watched')}
              icon={'checkmark'}
            />
          </>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: palette.strongBlack,
    marginTop: 10,
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
    marginTop: 5,
  },
  mockStatsBox: {height: 51},
});

export default ProfileStatsContainer;
