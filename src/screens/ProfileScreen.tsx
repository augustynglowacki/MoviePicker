import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert} from 'react-native';
import {batch, useDispatch, useSelector} from 'react-redux';
import {Loading} from 'src/components/common';
import ProfileComponent from 'src/components/profile/Profile';
import {Route} from 'src/constants';
import {ActiveUser, CollectionContent} from 'src/models';
import {
  getFavorite,
  getWatched,
  getWatchlist,
} from 'src/redux/collections/CollectionsActions';
import {collectionsSelector} from 'src/redux/collections/CollectionsSlice';
import {logOutUser} from 'src/redux/user/UserAction';
import {userThunkSelector} from 'src/redux/user/UserSlice';

const ProfileScreen: React.FC = () => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const {t} = useTranslation('common');

  useFocusEffect(
    useCallback(() => {
      batch(() => {
        dispatch(getWatchlist());
        dispatch(getFavorite());
        dispatch(getWatched());
      });
    }, [dispatch]),
  );

  const {watchlist, watched, favorite} = useSelector(collectionsSelector);

  const {
    user: {userName, avatar, coverPhoto},
  } = useSelector(userThunkSelector);

  const activeUser: ActiveUser = {
    userName,
    avatar,
    coverPhoto,
  };

  const navigateTo = () => {
    navigate(Route.SETTINGS);
  };
  const {loading} = useSelector(userThunkSelector);

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

  const collectionContent: CollectionContent[] = [
    {id: 3, title: t('movies:favorite'), collection: favorite},
    {id: 1, title: t('movies:watchlist'), collection: watchlist},
    {id: 2, title: t('movies:watched'), collection: watched},
  ];
  if (loading) {
    return <Loading />;
  }

  return (
    <ProfileComponent
      collectionContent={collectionContent}
      navigateToSettings={navigateTo}
      logOut={handleLogOut}
      activeUser={activeUser}
    />
  );
};

export default ProfileScreen;
