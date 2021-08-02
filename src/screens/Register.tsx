import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useCallback, useEffect} from 'react';
import {RegisterForm} from 'src/models';
import {PROFILE} from 'src/models/constants/routeNames';
import auth from '@react-native-firebase/auth';
import {createUserWithEmailAndPassword} from 'src/redux/user/UserAction';
import {useDispatch, useSelector} from 'react-redux';
import {userThunkSelector} from 'src/redux/user/UserSlice';
import {useFormik} from 'formik';
import {useTranslation} from 'react-i18next';
import RegisterComponent from 'src/components/auth/Register';
import * as Yup from 'yup';

const Register = () => {
  const {error, loading} = useSelector(userThunkSelector);
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const {t} = useTranslation('form');

  const goToProfile = useCallback(() => {
    navigate(PROFILE);
  }, [navigate]);

  const handleCreateUser = (register: RegisterForm) => {
    dispatch(
      createUserWithEmailAndPassword({
        email: register.email,
        password: register.password,
        displayName: register.username,
      }),
    );
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
    handleCreateUser(form);
  };

  const validationSchema = Yup.object({
    username: Yup.string().required(t('required')),
    email: Yup.string().email(t('email')).required(t('required')),
    password: Yup.string().min(6, t('short')).required(t('required')),
  });

  const {
    handleChange,
    handleSubmit,
    values: form,
    errors,
  } = useFormik<RegisterForm>({
    initialValues: {username: '', email: '', password: ''}, // create initial const above component
    validationSchema, //yup object
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
