import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import {Container, SectionHeader} from 'src/components/common';
import {IconTypes, Route} from 'src/constants';
import {userThunkSelector} from 'src/redux/user/UserSlice';
import {useSelector} from 'react-redux';
import palette from 'src/styles/palette';
import UserNameForm from 'src/components/settings/UserNameForm';
import UserEmailForm from 'src/components/settings/UserEmailForm';
import UserPasswordForm from 'src/components/settings/UserPasswordForm';
import HeaderBar from 'src/components/common/HeaderBar';
import Avatar from 'src/components/settings/Avatar';
import SettingOptionBox from 'src/components/settings/SettingOptionBox';
import ChangeBackground from 'src/components/settings/ChangeBackground';

const Settings: React.FC = () => {
  const [profileURI, setProfileURI] = useState<string>(
    'https://firebasestorage.googleapis.com/v0/b/moviepicker-2405b.appspot.com/o/users%2Fdefault%2FdefaultProfile.jpeg?alt=media&token=bc972054-6f70-4339-a72d-4a6c89be93a2',
  );
  const {user, error, loading} = useSelector(userThunkSelector);
  const {navigate} = useNavigation();
  const [displayUserName, setDisplayUserName] = useState<boolean>(false);
  const [displayUserEmail, setDisplayUserEmail] = useState<boolean>(false);
  const [displayUserPassword, setDisplayUserPassword] =
    useState<boolean>(false);
  const redirectToProfile = () => navigate(Route.PROFILE);
  const leftIcon = {
    name: 'arrow-back-ios',
    type: IconTypes.MATERIAL,
    onPressFunction: () => redirectToProfile(),
  };

  const fetchAvatar = async () => {
    try {
      const userId = auth().currentUser?.uid;
      const results = await storage()
        .ref(`/users/${userId}/profile.jpg`)
        .getDownloadURL();
      setProfileURI(results);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAvatar();
  }, []);

  if (displayUserName) {
    return (
      <UserNameForm
        userName={user.userName}
        goBackFunction={() => setDisplayUserName(false)}
        error={error}
        loading={loading}
      />
    );
  }

  if (displayUserEmail) {
    return (
      <UserEmailForm
        goBackFunction={() => setDisplayUserEmail(false)}
        userEmail={user.email}
        error={error}
        loading={loading}
      />
    );
  }
  if (displayUserPassword) {
    return (
      <UserPasswordForm
        goBackFunction={() => setDisplayUserPassword(false)}
        error={error}
        loading={loading}
      />
    );
  }
  console.log(user.email);
  return (
    <Container flexStart>
      <HeaderBar leftIcon={leftIcon} />
      <SectionHeader text="Update your profile" color={palette.white} center />
      <Avatar uri={profileURI} editable />
      <ChangeBackground />
      <SettingOptionBox
        text="Change Username"
        navigateTo={() => setDisplayUserName(true)}
      />
      <SettingOptionBox
        text="Change Email"
        navigateTo={() => setDisplayUserEmail(true)}
      />
      <SettingOptionBox
        text="Change Password"
        navigateTo={() => setDisplayUserPassword(true)}
      />
    </Container>
  );
};

export default Settings;
