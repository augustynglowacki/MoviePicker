import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import palette from 'src/styles/palette';
import {useTranslation} from 'react-i18next';
import {popularSelector} from 'src/redux/popular/PopularSlice';
import {useSelector} from 'react-redux';
import {CustomButton} from 'src/components/common';
import {ExploreScreenParams, Route} from 'src/constants';
import ProfileComponent from 'src/components/profile/Profile';
import Watchlist from 'src/components/watchlist/Watchlist';

const ExploreScreen: React.FC<ExploreScreenParams> = ({isLiked}) => {
  const {navigate} = useNavigation();
  const {t} = useTranslation('profile');

  const goToAuth = useCallback(() => {
    navigate(Route.AUTH);
  }, [navigate]);

  const {movies} = useSelector(popularSelector);

  const collectionContent = [
    {id: 1, title: t('movies:favorite'), collection: movies},
    {id: 2, title: t('movies:watched'), collection: movies},
    {id: 3, title: t('movies:watchlist'), collection: movies},
  ];

  return (
    <View style={styles.container}>
      {isLiked ? (
        <Watchlist movies={movies} isExplore />
      ) : (
        <ProfileComponent
          isExplore
          collectionContent={collectionContent}
          navigateToSettings={() => {}}
          logOut={() => {}}
        />
      )}
      <BlurView style={styles.absolute} blurType="dark" blurAmount={5} />
      <View style={styles.box}>
        <Text style={styles.text}>{t('explore')}</Text>
        <Text style={styles.subText}>{t('exploreSub')}</Text>
        <View style={styles.buttons}>
          <CustomButton
            label={t('button')}
            variant="secondary"
            onPress={goToAuth}
          />
        </View>
      </View>
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.black,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  box: {
    position: 'absolute',
  },
  text: {
    paddingTop: 50,
    fontSize: 32,
    color: palette.white,
    textAlign: 'center',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
  },
  subText: {
    fontSize: 12,
    marginVertical: 10,
    color: palette.white,
    textAlign: 'center',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
  },
  buttons: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
