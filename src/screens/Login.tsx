import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import LoginComponent from '../components/auth/Login';
import {LoginForm} from '../models';
import {PROFILE} from '../models/constants/routeNames';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {
  signInWithEmailAndPassword,
  signInWithGoogle,
} from '../redux/user/UserAction';
import {useSelector} from 'react-redux';
import {userThunkSelector} from '../redux/user/UserSlice';
import {useTranslation} from 'react-i18next';
import {useFormik} from 'formik';
let Yup = require('yup');

const Login = () => {
  const {error, loading} = useSelector(userThunkSelector);
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const {t} = useTranslation();

  const goToProfile = React.useCallback(() => {
    navigate(PROFILE);
  }, [navigate]);

  const handleLoginUser = (login: LoginForm) => {
    console.log(login);
    dispatch(
      signInWithEmailAndPassword({
        email: login.email,
        password: login.password,
      }),
    );
  };

  const handleSignInWithGoogle = () => {
    dispatch(signInWithGoogle());
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        goToProfile();
      }
    });
    return subscriber;
  }, [goToProfile]);

  const onSubmit = () => {
    console.log('login>>', form);
    handleLoginUser(form);
  };

  const validationSchema = Yup.object({
    email: Yup.string().email(t('form:email')).required(t('form:required')),
    password: Yup.string().min(6, t('form:short')).required(t('form:required')),
  });

  const {
    handleChange,
    handleSubmit,
    values: form,
    errors,
  } = useFormik<LoginForm>({
    initialValues: {email: '', password: ''},
    validationSchema, //yup object
    //validate only after submit click
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: onSubmit,
  });

  return (
    <LoginComponent
      onSubmit={handleSubmit}
      onChange={handleChange}
      form={form}
      serverError={error}
      errors={errors}
      signUpWithGoogle={handleSignInWithGoogle}
      loading={loading}
    />
  );
};

export default Login;
