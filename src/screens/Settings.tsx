import React, {useState} from 'react';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {setActiveUser, userThunkSelector} from 'src/redux/user/UserSlice';
import {useFormik} from 'formik';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import SettingsComponent from 'src/components/settings/Settings';
import {Route} from 'src/models/constants/routeNames';
import {MIN_PASSWORD_LENGTH} from './Register';
export interface FormValues {
  email: any;
  newEmail: any;
  password: string;
  newPassword: string;
  displayName: any;
}

const SettingsScreen: React.FC = () => {
  const {user} = useSelector(userThunkSelector);
  const dispatch = useDispatch();
  const {t} = useTranslation('form');
  const {navigate} = useNavigation();
  const [error, setError] = useState<any>(''); // any
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = () => {
    const displayNameFirebase = auth().currentUser?.displayName;
    if (values.displayName !== displayNameFirebase) {
      handleUserNameUpdate(values);
    }
    if (values.newEmail !== '') {
      // u know what
      handleUserEmailUpdate(values);
    }
    if (values.newPassword !== '') {
      // u know what
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
      navigate(Route.PROFILE);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(''), 4000); // ????
    } finally {
      setLoading(false);
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
      navigate(Route.PROFILE);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(''), 4000);
    } // add finally
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
    navigate(Route.PROFILE);
  };

  const validationSchema = Yup.object({
    displayName: Yup.string().min(3), // add const for this min values
    email: Yup.string().email(t('email')),
    newEmail: Yup.string().email(t('email')),
    password: Yup.string().min(6, t('short', {MIN_PASSWORD_LENGTH})).required(),
    newPassword: Yup.string().min(6, t('short', {MIN_PASSWORD_LENGTH})),
  });

  const {setFieldValue, handleChange, handleSubmit, errors, values} = useFormik(
    {
      initialValues: {
        email: user.email,
        newEmail: '',
        password: '',
        newPassword: '',
        displayName: user.userName,
      }, // create initial const
      validationSchema,
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit, // u know what
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

export default SettingsScreen;
