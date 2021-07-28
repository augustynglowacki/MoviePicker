import React from 'react';
import SettingsSection from '../components/organisms/SettingsSection';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {setActiveUser, userThunkSelector} from '../redux/user/UserSlice';
import {useFormik} from 'formik';
import auth from '@react-native-firebase/auth';
import {
  signInWithEmailAndPassword,
  updateEmail,
} from '../redux/user/UserAction';

export interface IFormValues {
  email: any;
  newEmail: any;
  password: string;
  newPassword: string;
  displayName: any;
}

const Settings = () => {
  const {user, error} = useSelector(userThunkSelector);
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const onSubmit = () => {
    handleUserUpdate(values);
  };

  const handleUserUpdate = async ({
    displayName,
    email,
    newEmail,
    password,
    newPassword,
  }: IFormValues) => {
    try {
      const displayNameFirebase = auth().currentUser?.displayName;
      if (displayName !== displayNameFirebase) {
        await auth().currentUser?.updateProfile({
          displayName: displayName,
        });
        if (!error) {
          dispatch(
            setActiveUser({
              userName: displayNameFirebase,
            }),
          );
        }
      }
      console.log(newPassword);

      if (newEmail !== '') {
        dispatch(signInWithEmailAndPassword({email, password}));
        dispatch(updateEmail(email));
        if (!error) {
          dispatch(
            setActiveUser({
              userName: auth().currentUser?.displayName,
              email: newEmail,
            }),
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const validationSchema = Yup.object({
    displayName: Yup.string(),
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
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit: onSubmit,
    },
  );

  return (
    <SettingsSection
      values={values}
      onSubmit={handleSubmit}
      onChange={handleChange}
      fieldValue={setFieldValue}
      serverError={error}
      errors={errors}
    />
  );
};

export default Settings;
