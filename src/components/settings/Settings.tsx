import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  CustomModal,
  Loading,
  SectionHeader,
} from 'src/components/common';
import {IconTypes, Route} from 'src/constants';
import palette from 'src/styles/palette';
import HeaderBar from 'src/components/common/HeaderBar';
import {Avatar} from 'src/components/common';
import SettingsOptionBox from 'src/components/settings/SettingsOptionBox';
import ChangeBackground from 'src/components/settings/ChangeBackground';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {userThunkSelector} from 'src/redux/user/UserSlice';
import {pickImage} from 'src/helpers/pickImage';
import {updateUserPhoto} from 'src/redux/user/UserAction';
import {StyleSheet, View} from 'react-native';

interface Props {
  handleImageChange: () => void;
}

const Settings: React.FC<Props> = () => {
  const {navigate} = useNavigation();
  const {t} = useTranslation('common');
  const redirectToProfile = () => navigate(Route.PROFILE);
  const [isModalVisible, setModalVisible] = useState(false);

  const leftIcon = {
    type: IconTypes.IONICON,
    name: 'ios-arrow-back',
    onPressFunction: () => redirectToProfile(),
  };

  const config = [
    {
      text: 'Change Username',
      navigateTo: () => navigate(Route.USERNAME_FORM),
    },
    {
      text: 'Change Email',
      navigateTo: () => navigate(Route.USER_EMAIL_FORM),
    },
    {
      text: 'Change Password',
      navigateTo: () => navigate(Route.USER_PASSWORD_FORM),
    },
  ];
  const {
    user: {avatar},
    loading,
  } = useSelector(userThunkSelector);

  const dispatch = useDispatch();

  const handleImageChange = async (camera = false) => {
    setModalVisible(false);
    const newRes = await pickImage(camera);
    setModalVisible(false);
    if (newRes) {
      dispatch(updateUserPhoto(newRes));
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container flexStart>
      <HeaderBar leftIcon={leftIcon} />
      <SectionHeader text={t('updateProfile')} color={palette.white} center />
      <View style={styles.avatar}>
        <Avatar source={avatar} editable onPress={toggleModal} />
      </View>
      <CustomModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        onPressTop={() => handleImageChange(true)}
        onPressBottom={() => handleImageChange()}
      />
      <ChangeBackground />
      {config.map(item => (
        <SettingsOptionBox
          text={item.text}
          navigateTo={item.navigateTo}
          key={item.text}
        />
      ))}
    </Container>
  );
};

export default Settings;
const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
});
