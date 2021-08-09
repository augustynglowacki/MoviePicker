import React from 'react';
import {Image, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import {View} from 'react-native';
import {Text} from 'react-native';
import palette from 'src/styles/palette';
import {HEADER_HEIGHT} from 'src/constants';
import {useSelector} from 'react-redux';
import {userThunkSelector} from 'src/redux/user/UserSlice';
import {useTranslation} from 'react-i18next';

const ProfileHeader: React.FC = () => {
  //TODO: photoURI from selector
  const placeholder =
    'https://firebasestorage.googleapis.com/v0/b/moviepicker-2405b.appspot.com/o/users%2Fdefault%2FdefaultProfile.jpeg?alt=media&token=bc972054-6f70-4339-a72d-4a6c89be93a2';
  const photoURI = auth().currentUser?.photoURL;
  const {
    user: {userName},
  } = useSelector(userThunkSelector);
  const {t} = useTranslation('profile');

  return (
    <View style={styles.wrapper}>
      <Image
        source={{
          uri: photoURI || placeholder,
        }}
        style={styles.avatar}
      />
      <Text style={[styles.text, styles.titleText]}>{userName}</Text>
      <Text style={[styles.text, styles.subText]}>{t('premium')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  text: {
    color: palette.white,
  },
  titleText: {
    fontSize: 30,
  },
  subText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: palette.primary,
  },
});
export default ProfileHeader;
