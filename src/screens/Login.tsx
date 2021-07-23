import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import LoginComponent from '../components/organisms/Login';
import {LoginForm} from '../models';
import {PROFILE} from '../models/constants/routeNames';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {signInWithEmailAndPassword} from '../redux/user/UserAction';
import {useSelector} from 'react-redux';
import {userThunkSelector} from '../redux/user/UserSlice';

const initialState = {email: '', password: ''};

const Login = () => {
  const [form, setForm] = useState<LoginForm>(initialState);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errors, setErrors] = useState<LoginForm>(initialState);
  const {navigate} = useNavigation();
  const {error} = useSelector(userThunkSelector);

  const goToProfile = React.useCallback(() => {
    navigate(PROFILE);
  }, [navigate]);

  const dispatch = useDispatch();

  const handleLoginUser = (login: LoginForm) => {
    console.log(login);
    dispatch(
      signInWithEmailAndPassword({
        email: login.email,
        password: login.password,
      }),
    );
  };

  // const handleSignInWithGoogle = () => {
  //   dispatch(signInWithGoogle());
  // };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        goToProfile();
      }
    });
    return subscriber;
  }, [goToProfile]);

  //real-time validation
  const onChange = ({name, value}: {name: string; value: string}) => {
    setForm({...form, [name]: value});
  };

  const onSubmit = () => {
    console.log('login>>', form);
    console.log(error);
    handleLoginUser(form);
  };

  return (
    <LoginComponent
      onSubmit={onSubmit}
      onChange={onChange}
      form={form}
      error={error}
    />
  );
};

export default Login;
