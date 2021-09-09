import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import {Text} from 'react-native';
import palette from 'src/styles/palette';
import {DEFAULT_AVATAR, HEADER_HEIGHT} from 'src/constants';
import {useDispatch, useSelector} from 'react-redux';
import {userThunkSelector} from 'src/redux/user/UserSlice';
import {useTranslation} from 'react-i18next';
import {updateUserPhoto} from 'src/redux/user/UserAction';
import {pickImage} from 'src/helpers/pickImage';
import {CustomModal} from 'src/components/common';
import {Avatar} from 'src/components/common';

const ProfileHeader: React.FC = () => {
  const {
    user: {userName, avatar},
  } = useSelector(userThunkSelector);
  const {t} = useTranslation('profile');
  const name = userName || t('name');
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleImageChange = async (camera = false) => {
    setModalVisible(false);
    const newRes = await pickImage(camera);
    if (newRes) {
      dispatch(updateUserPhoto(newRes));
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.wrapper}>
      <Avatar source={avatar || DEFAULT_AVATAR} onPress={toggleModal} />
      <CustomModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        onPressTop={() => handleImageChange(true)}
        onPressBottom={() => handleImageChange()}
      />
      <Text style={[styles.text, styles.titleText]}>{name}</Text>
      <Text style={[styles.text, styles.subText]}>{t('premium')}</Text>
    </View>
  );
};
//ad height from insets
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
