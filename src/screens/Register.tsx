import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useCallback, useEffect} from 'react';
import RegisterComponent from '../components/organisms/Register';
import {RegisterForm} from '../models';
import {PROFILE} from '../models/constants/routeNames';
import auth from '@react-native-firebase/auth';
import {createUserWithEmailAndPassword} from '../redux/user/UserAction';
import {useDispatch, useSelector} from 'react-redux';
import {userThunkSelector} from '../redux/user/UserSlice';
import {useFormik} from 'formik';
import {useTranslation} from 'react-i18next';
let Yup = require('yup');

const Register = () => {
  const {error} = useSelector(userThunkSelector);
  const dispatch = useDispatch();
  // Hook needed to navigate to login after succesful register
  const {navigate} = useNavigation();
  const {t} = useTranslation();

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
    console.log('form:>>', form);
    handleCreateUser(form);
  };

  const validationSchema = Yup.object({
    username: Yup.string().required(t('form:required')),
    email: Yup.string().email(t('form:email')).required(t('form:required')),
    password: Yup.string().min(6, t('form:short')).required(t('form:required')),
  });

  const {
    handleChange,
    handleSubmit,
    values: form,
    errors,
  } = useFormik<RegisterForm>({
    initialValues: {username: '', email: '', password: ''},
    validationSchema, //yup object
    //validate only after submit click
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: onSubmit,
  });

  // useEffect(() => {
  //   console.log(form, errors);
  // }, [form, errors]);

  return (
    <RegisterComponent
      onSubmit={handleSubmit}
      onChange={handleChange}
      form={form}
      serverError={error}
      errors={errors}
    />
  );
};

export default Register;
