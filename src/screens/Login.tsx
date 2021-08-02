import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import LoginComponent from 'src/components/auth/Login';
import {LoginForm} from 'src/models';
import {PROFILE} from 'src/models/constants/routeNames';
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
import {getGoogleCredencial} from '../service/firestore/getGoogleCredential';
import Yup from 'yup';

const Login = () => {
  const {error, loading} = useSelector(userThunkSelector);
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const {t} = useTranslation('form');

  const goToProfile = React.useCallback(() => {
    //redirectToProfileScreen
    navigate(PROFILE);
  }, [navigate]);

  const handleLoginUser = (login: LoginForm) => {
    dispatch(
      signInWithEmailAndPassword({
        email: login.email,
        password: login.password,
      }),
    );
  };

  const handleSignInWithGoogle = async () => {
    const googleCredencial = await getGoogleCredencial();
    if (googleCredencial) {
      dispatch(signInWithGoogle(googleCredencial));
    }
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
    handleLoginUser(form);
  };

  const validationSchema = Yup.object({
    email: Yup.string().email(t('email')).required(t('required')),
    password: Yup.string().min(6, t('short')).required(t('required')),
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
    onSubmit, //it is enough
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
