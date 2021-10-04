import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Container, CustomModal, Loading} from 'src/components/common';
import {IconTypes, Route, SettingScreenProp} from 'src/constants';
import palette from 'src/styles/palette';
import HeaderBar from 'src/components/common/HeaderBar';
import {Avatar} from 'src/components/common';
import SettingsOptionBox from 'src/components/settings/SettingsOptionBox';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {userThunkSelector} from 'src/redux/user/UserSlice';
import {pickImage} from 'src/helpers/pickImage';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {updateUserPhoto} from 'src/redux/user/UserAction';

const Settings: React.FC = () => {
  const {navigate} = useNavigation<SettingScreenProp>();
  const {t} = useTranslation('settings');
  const redirectToProfile = () => navigate(Route.PROFILE);
  const [isModalVisible, setModalVisible] = useState(false);

  const leftIcon = {
    type: IconTypes.IONICON,
    name: 'ios-arrow-back',
    onPressFunction: () => redirectToProfile(),
  };

  const {
    user: {avatar, email, userName},
    loading,
  } = useSelector(userThunkSelector);

  const account = [
    {
      title: userName,
      subtext: 'Tap to change username',
      navigateTo: () => navigate(Route.USERNAME_FORM),
    },
    {
      title: email,
      subtext: 'Tap to change email',
      navigateTo: () => navigate(Route.USER_EMAIL_FORM),
    },
    {
      title: 'Password',
      subtext: 'Try to type strong password',
      navigateTo: () => navigate(Route.USER_PASSWORD_FORM),
    },
  ];

  const dispatch = useDispatch();
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

  if (loading) {
    return <Loading />;
  }
  return (
    <Container flexStart disableScroll>
      <View>
        <HeaderBar leftIcon={leftIcon} title={t('title')} />
        <View style={styles.info}>
          <Avatar source={avatar} onPress={toggleModal} />
          <CustomModal
            isModalVisible={isModalVisible}
            toggleModal={toggleModal}
            onPressTop={() => handleImageChange(true)}
            onPressBottom={() => handleImageChange()}
          />
          <View style={styles.textBox}>
            {userName && <Text style={styles.titleText}>{userName}</Text>}
            <Text style={styles.subText}>{t('profile:premium')}</Text>
          </View>
        </View>
        <View>
          <Text style={[styles.subText, styles.padded]}>{t('account')}</Text>
          {account.map(item => (
            <SettingsOptionBox
              title={item.title}
              subtitle={item.subtext}
              onPress={item.navigateTo}
              key={item.subtext}
            />
          ))}
          <Text style={[styles.subText, styles.padded]}>{t('profile')}</Text>
          <SettingsOptionBox
            title={t('avatar')}
            subtitle={t('avatarSub')}
            onPress={toggleModal}
            icon={'person-circle-outline'}
          />
          {/*  TODO: Add this when background action will be done
        <SettingsOptionBox
          title="Background"
          subtitle="You can add your costume cover photo"
          onPress={() => {}}
          icon={'image-outline'}
        /> */}
          <Text style={[styles.subText, styles.padded]}>{t('help')}</Text>
          <SettingsOptionBox
            title={t('contact')}
            subtitle={t('contactSub')}
            onPress={() => navigate(Route.CONTACT)}
            icon={'mail-outline'}
          />
          <SettingsOptionBox
            title={t('about')}
            subtitle={t('aboutSub')}
            onPress={() => navigate(Route.INFO)}
            icon={'information-circle-outline'}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text}>{t('version')}</Text>
      </View>
    </Container>
  );
};

export default Settings;

const styles = StyleSheet.create({
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  text: {
    color: palette.lightWhite,
    fontSize: 12,
  },
  titleText: {
    fontSize: 25,
    color: palette.white,
  },
  textBox: {
    marginLeft: 20,
  },
  subText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: palette.primary,
  },
  padded: {
    paddingVertical: 5,
    paddingLeft: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
});
