import React, {useEffect} from 'react';
import {getMovies, movieSelector} from 'src/redux/movie/MovieSlice';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {setActiveUser, userThunkSelector} from 'src/redux/user/UserSlice';
import PopularComponent from 'src/components/popular/Popular';

const PopularScreen: React.FC = () => {
  const dispatch = useDispatch();
  const {movies, loading, error} = useSelector(movieSelector);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  const {
    user: {email},
  } = useSelector(userThunkSelector);

  useEffect(() => {
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!email) {
      //u know what
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
