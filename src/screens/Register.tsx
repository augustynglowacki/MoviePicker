import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useEffect} from 'react';
import {RegisterForm} from 'src/models';
import auth from '@react-native-firebase/auth';
import {createUserWithEmailAndPassword} from 'src/redux/user/UserAction';
import {useDispatch, useSelector} from 'react-redux';
import {userThunkSelector} from 'src/redux/user/UserSlice';
import {useFormik} from 'formik';
import {useTranslation} from 'react-i18next';
import RegisterComponent from 'src/components/auth/Register';
import * as Yup from 'yup';
import {Route} from 'src/models/constants/routeNames';

export const MIN_PASSWORD_LENGTH = 6;
const initialState = {username: '', email: '', password: ''};

const Register: React.FC = () => {
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

  const handleCreateUser = ({email, password, username}: RegisterForm) => {
    dispatch(
      createUserWithEmailAndPassword({
        email,
        password,
        displayName: username,
      }),
    );
  };

  const onSubmit = () => {
    handleCreateUser(form);
  };

  const validationSchema = Yup.object({
    username: Yup.string().required(t('required')),
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
  } = useFormik<RegisterForm>({
    initialValues: initialState,
    validationSchema,
    //validate only after submit click
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit,
  });

  return (
    <RegisterComponent
      onSubmit={handleSubmit}
      onChange={handleChange}
      form={form}
      serverError={error}
      errors={errors}
      loading={loading}
    />
  );
};

export default Register;
