import React, {useState} from 'react';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {setActiveUser, userThunkSelector} from '../redux/user/UserSlice';
import {useFormik} from 'formik';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {PROFILE} from '../models/constants/routeNames';
import SettingsComponent from '../components/settings/Settings';

export interface FormValues {
  email: any;
  newEmail: any;
  password: string;
  newPassword: string;
  displayName: any;
}

const Settings = () => {
  const {user} = useSelector(userThunkSelector);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const [error, setError] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = () => {
    const displayNameFirebase = auth().currentUser?.displayName;
    if (values.displayName !== displayNameFirebase) {
      handleUserNameUpdate(values);
    }
    if (values.newEmail !== '') {
      handleUserEmailUpdate(values);
    }
    if (values.newPassword !== '') {
      handlePasswordUpdate(values);
    }
  };

  const handlePasswordUpdate = async ({
    newPassword,
    password,
    email,
  }: FormValues) => {
    try {
      setLoading(true);
      await auth().signInWithEmailAndPassword(email, password);
      await auth().currentUser?.updatePassword(newPassword);
      setLoading(false);
      navigate(PROFILE);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(''), 4000);
    }
  };

  const handleUserEmailUpdate = async ({
    newEmail,
    email,
    password,
    displayName,
  }: FormValues) => {
    try {
      setLoading(true);
      await auth().signInWithEmailAndPassword(email, password);
      await auth().currentUser?.updateEmail(newEmail);
      dispatch(
        setActiveUser({
          userName: displayName,
          email: newEmail,
        }),
      );
      setLoading(false);
      navigate(PROFILE);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(''), 4000);
    }
  };
  const handleUserNameUpdate = async ({displayName}: FormValues) => {
    await auth().currentUser?.updateProfile({
      displayName,
    });
    dispatch(
      setActiveUser({
        userName: displayName,
      }),
    );
    navigate(PROFILE);
  };

  const validationSchema = Yup.object({
    displayName: Yup.string().min(3),
    email: Yup.string().email(t('form:email')),
    newEmail: Yup.string().email(t('form:email')),
    password: Yup.string().min(6, t('form:short')).required(),
    newPassword: Yup.string().min(6, t('form:short')),
  });

  const {setFieldValue, handleChange, handleSubmit, errors, values} = useFormik(
    {
      initialValues: {
        email: user.email,
        newEmail: '',
        password: '',
        newPassword: '',
        displayName: user.userName,
      },
      validationSchema,
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit: onSubmit,
    },
  );

  return (
    <SettingsComponent
      values={values}
      onSubmit={handleSubmit}
      onChange={handleChange}
      fieldValue={setFieldValue}
      serverError={error}
      errors={errors}
      loading={loading}
    />
  );
};

export default Settings;
