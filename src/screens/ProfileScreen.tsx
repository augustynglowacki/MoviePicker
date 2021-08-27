import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ProfileComponent from 'src/components/profile/Profile';
import {Route} from 'src/constants';
import {getWatchlist} from 'src/redux/collections/CollectionsActions';
import {collectionsSelector} from 'src/redux/collections/CollectionsSlice';
import {logOutUser} from 'src/redux/user/UserAction';

const ProfileScreen: React.FC = () => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const {t} = useTranslation('common');

  useFocusEffect(
    useCallback(() => {
      dispatch(getWatchlist());
    }, [dispatch]),
  );

  const {watchlist} = useSelector(collectionsSelector);

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
    {id: 1, title: t('movies:watchlist'), collection: watchlist.movies},
    {id: 2, title: t('movies:watched'), collection: watchlist.movies},
    {id: 3, title: t('movies:watchlist'), collection: watchlist.movies},
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
