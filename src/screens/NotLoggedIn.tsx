import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Profile from '../components/profile/Profile';
import {AUTH} from '../models/constants/routeNames';
import {BlurView} from '@react-native-community/blur';
import colors from '../assets/theme/colors';
import Liked from '../components/liked/Liked';
import {useTranslation} from 'react-i18next';
import {movieSelector} from '../redux/movie/MovieSlice';
import {useSelector} from 'react-redux';
import {CustomButton} from '../components/common';

const NotLoggedIn = ({isLiked}: {isLiked: boolean}) => {
  const {navigate} = useNavigation();
  const {t} = useTranslation();

  const goToAuth = useCallback(() => {
    navigate(AUTH);
  }, [navigate]);

  const {movies} = useSelector(movieSelector);

  return (
    <View style={styles.container}>
      {isLiked ? <Liked movies={movies} /> : <Profile />}
      <BlurView style={styles.absolute} blurType="dark" blurAmount={5} />
      <View style={styles.box}>
        <Text style={styles.text}>{t('profile:explore')}</Text>
        <Text style={styles.subText}>{t('profile:exploreSub')}</Text>
        <View style={styles.buttons}>
          <CustomButton
            label={t('profile:button')}
            variant="primary"
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
    backgroundColor: colors.black,
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
    color: colors.white,
    textAlign: 'center',
  },
  subText: {
    fontSize: 10,
    marginVertical: 10,
    color: colors.white,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
