import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ProfileComponent from 'src/components/profile/Profile';
import {Route} from 'src/constants';
import {popularSelector} from 'src/redux/popular/PopularSlice';
import {logOutUser} from 'src/redux/user/UserAction';

const ProfileScreen: React.FC = () => {
  const {movies} = useSelector(popularSelector);
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const {t} = useTranslation('common');

  const navigateTo = () => {
    navigate(Route.SETTINGS);
  };

  const handleLogOut = () => {
    Alert.alert(t('logout'), t('logoutWarning'), [
      {
        text: t('cancel'),
        onPress: () => {},
      },
      {
        text: t('ok'),
        onPress: () => dispatch(logOutUser()),
      },
    ]);
  };

  const collectionContent = [
    {id: 1, title: t('movies:favorite'), collection: movies},
    {id: 2, title: t('movies:watched'), collection: movies},
    {id: 3, title: t('movies:toWatch'), collection: movies},
  ];

  return (
    <ProfileComponent
      collectionContent={collectionContent}
      navigateToSettings={navigateTo}
      logOut={handleLogOut}
    />
  );
};

export default ProfileScreen;
