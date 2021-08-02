import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Profile from 'src/components/profile/Profile';
import {BlurView} from '@react-native-community/blur';
import palette from 'src/styles/palette';
import {useTranslation} from 'react-i18next';
import {movieSelector} from 'src/redux/movie/MovieSlice';
import {useSelector} from 'react-redux';
import {CustomButton} from 'src/components/common';
import FavoriteContentBox from 'src/components/favorite/FavoriteContentBox';
import {Route} from 'src/models/constants/routeNames';

interface Props {
  isLiked: boolean;
}

const NotLoggedIn: React.FC<Props> = ({isLiked}) => {
  const {navigate} = useNavigation();
  const {t} = useTranslation('profile');

  const goToAuth = useCallback(() => {
    navigate(Route.AUTH);
  }, [navigate]);

  const {movies} = useSelector(movieSelector);

  return (
    <View style={styles.container}>
      {isLiked ? <FavoriteContentBox movies={movies} /> : <Profile />}
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

export default NotLoggedIn;

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
  },
  subText: {
    fontSize: 10,
    marginVertical: 10,
    color: palette.white,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
