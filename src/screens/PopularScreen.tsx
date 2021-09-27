import React, {useEffect} from 'react';
import {popularSelector} from 'src/redux/popular/PopularSlice';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {setActiveUser, userThunkSelector} from 'src/redux/user/UserSlice';
import PopularComponent from 'src/components/popular/Popular';
import {fetchCover} from 'src/service/firestore/getData';
import {DEFAULT_COVER} from 'src/constants';

const PopularScreen: React.FC = () => {
  const dispatch = useDispatch();
  const {movies, loading, error} = useSelector(popularSelector);

  const {
    user: {email},
  } = useSelector(userThunkSelector);

  useEffect(() => {
    if (!email) {
      const subscriber = auth().onAuthStateChanged(async user => {
        if (user) {
          const cover = (await fetchCover(user.uid)) ?? DEFAULT_COVER;
          dispatch(
            setActiveUser({
              email: user.email,
              userName: user.displayName,
              avatar: user.photoURL,
              coverPhoto: cover,
            }),
          );
        }
      });
      return subscriber;
    }
  }, [dispatch, email]);

  return (
    <PopularComponent
      loading={loading}
      error={error}
      movies={movies}
      loggedIn={!!email}
    />
  );
};

export default PopularScreen;
