import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import {Text} from 'react-native';
import palette from 'src/styles/palette';
import {DEFAULT_AVATAR, HEADER_HEIGHT} from 'src/constants';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {updateUserPhoto} from 'src/redux/user/UserAction';
import {pickImage} from 'src/helpers/pickImage';

interface Props {
  userName: string;
  avatar: string;
}

const ProfileHeader: React.FC<Props> = ({userName, avatar}) => {
  const {t} = useTranslation('profile');
  const name = userName || t('name');
  const dispatch = useDispatch();

  const saveToFirestore = async () => {
    const newRes = await pickImage();
    if (newRes) {
      dispatch(updateUserPhoto(newRes));
    }
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={saveToFirestore}>
        <Image
          source={{
            uri: avatar || DEFAULT_AVATAR,
          }}
          style={styles.avatar}
        />
      </TouchableOpacity>
      <Text style={[styles.text, styles.titleText]}>{name}</Text>
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
