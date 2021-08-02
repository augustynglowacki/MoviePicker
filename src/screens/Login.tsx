import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import LoginComponent from 'src/components/auth/Login';
import {LoginForm} from 'src/models';
import {Route} from 'src/models/constants/routeNames';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {
  signInWithEmailAndPassword,
  signInWithGoogle,
} from 'src/redux/user/UserAction';
import {useSelector} from 'react-redux';
import {userThunkSelector} from 'src/redux/user/UserSlice';
import {useTranslation} from 'react-i18next';
import {useFormik} from 'formik';
import {MIN_PASSWORD_LENGTH} from './Register';
import {getGoogleCredential} from '../service/firestore/getGoogleCredential';
import * as Yup from 'yup';

const initialState = {email: '', password: ''};

const Login: React.FC = () => {
  const {error, loading} = useSelector(userThunkSelector);
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const {t} = useTranslation('form');

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        navigate(Route.PROFILE);
      }
    });
    return subscriber;
  }, [navigate]);

  const handleSignInWithGoogle = async () => {
    const googleCredential = await getGoogleCredential();
    if (googleCredential) {
      dispatch(signInWithGoogle(googleCredential));
    }
  };

  const handleLoginUser = ({email, password}: LoginForm) => {
    dispatch(
      signInWithEmailAndPassword({
        email,
        password,
      }),
    );
  };

  const onSubmit = () => {
    handleLoginUser(form);
  };

  const validationSchema = Yup.object({
    email: Yup.string().email(t('email')).required(t('required')),
    password: Yup.string()
      .min(MIN_PASSWORD_LENGTH, t('short', {MIN_PASSWORD_LENGTH}))
      .required(t('required')),
  });

  const {
    handleChange,
    handleSubmit,
    values: form,
    errors,
  } = useFormik<LoginForm>({
    initialValues: initialState,
    validationSchema,
    //validate only after submit click
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit,
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
