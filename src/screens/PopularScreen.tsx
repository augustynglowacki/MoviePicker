import React, {useEffect} from 'react';
import {getPopular, popularSelector} from 'src/redux/popular/PopularSlice';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {setActiveUser, userThunkSelector} from 'src/redux/user/UserSlice';
import PopularComponent from 'src/components/popular/Popular';

const PopularScreen: React.FC = () => {
  const dispatch = useDispatch();
  const {movies, loading, error} = useSelector(popularSelector);

  useEffect(() => {
    dispatch(getPopular());
  }, [dispatch]);

  const {
    user: {email},
  } = useSelector(userThunkSelector);

  useEffect(() => {
    if (!email) {
      const subscriber = auth().onAuthStateChanged(user => {
        //ts + move into service
        if (user) {
          dispatch(
            setActiveUser({
              email: user.email,
              userName: user.displayName,
            }),
          );
        }
      });
      return subscriber;
    }
  }, [dispatch, email]);

  return <PopularComponent loading={loading} error={error} movies={movies} />;
};

export default PopularScreen;
