import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import {Container, SectionHeader} from 'src/components/common';
import {IconTypes, Route} from 'src/constants';
import palette from 'src/styles/palette';
import HeaderBar from 'src/components/common/HeaderBar';
import Avatar from 'src/components/settings/Avatar';
import SettingOptionBox from 'src/components/settings/SettingOptionBox';
import ChangeBackground from 'src/components/settings/ChangeBackground';
import {useTranslation} from 'react-i18next';

const Settings: React.FC = () => {
  const [profileURI, setProfileURI] = useState<string>(
    'https://firebasestorage.googleapis.com/v0/b/moviepicker-2405b.appspot.com/o/users%2Fdefault%2FdefaultProfile.jpeg?alt=media&token=bc972054-6f70-4339-a72d-4a6c89be93a2',
  );
  const {navigate} = useNavigation();
  const {t} = useTranslation('common');
  const redirectToProfile = () => navigate(Route.PROFILE);
  const leftIcon = {
    name: 'arrow-back-ios',
    type: IconTypes.MATERIAL,
    onPressFunction: () => redirectToProfile(),
  };

  const fetchAvatar = async () => {
    try {
      const userId = auth().currentUser?.uid;
      const avatar = await storage()
        .ref(`/users/${userId}/profile.jpg`)
        .getDownloadURL();
      setProfileURI(avatar);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAvatar();
  }, []);

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

  return (
    <Container flexStart>
      <HeaderBar leftIcon={leftIcon} />
      <SectionHeader text={t('updateProfile')} color={palette.white} center />
      <Avatar uri={profileURI} editable />
      <ChangeBackground />
      {config.map(formEl => (
        <SettingOptionBox
          text={formEl.text}
          navigateTo={formEl.navigateTo}
          key={formEl.text}
        />
      ))}
    </Container>
  );
};

export default Settings;
