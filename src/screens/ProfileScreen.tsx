import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert} from 'react-native';
import {batch, useDispatch, useSelector} from 'react-redux';
import LoadingScreen from 'src/components/common/Loading';
import ProfileComponent from 'src/components/profile/Profile';
import {Route} from 'src/constants';
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

  const collectionContent = [
    {id: 3, title: t('movies:favorite'), collection: favorite.movies},
    {id: 1, title: t('movies:watchlist'), collection: watchlist.movies},
    {id: 2, title: t('movies:watched'), collection: watched.movies},
  ];

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ProfileComponent
      collectionContent={collectionContent}
      navigateToSettings={navigateTo}
      logOut={handleLogOut}
    />
  );
};

export default ProfileScreen;
