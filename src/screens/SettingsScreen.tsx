import React from 'react';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {setActiveUser, userThunkSelector} from 'src/redux/user/UserSlice';
import {useFormik} from 'formik';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import SettingsBox from 'src/components/settings/SettingsBox';
import {updateUserEmail, updateUserPassword} from 'src/redux/user/UserAction';
import {MIN_PASSWORD_LENGTH} from './RegisterScreen';
import {Route} from 'src/constants';

export interface UpdateUserFormValues {
  displayEmail: boolean;
  email: string;
  newEmail: string;
  password: string;
  newPassword: string;
  displayName: string;
}

const SettingsScreen: React.FC = () => {
  const {user, error, loading} = useSelector(userThunkSelector);
  const dispatch = useDispatch();
  const {t} = useTranslation('form');
  const {navigate} = useNavigation();
  const yupEmail = Yup.string().email(t('email'));
  const yupPassword = Yup.string().min(
    MIN_PASSWORD_LENGTH,
    t('short', {MIN_PASSWORD_LENGTH}),
  );
  const redirectToProfile = () => navigate(Route.PROFILE);

  const onSubmit = () => {
    const displayNameFirebase = auth().currentUser?.displayName;
    if (values.displayName !== displayNameFirebase) {
      handleUserNameUpdate(values);
    }
    if (values.newEmail) {
      handleUserEmailUpdate(values);
    }
    if (values.newPassword) {
      handleUserPasswordUpdate(values);
    }
  };

  const handleUserEmailUpdate = (values: UpdateUserFormValues) => {
    dispatch(
      updateUserEmail({
        ...values,
        callback: redirectToProfile,
      }),
    );
  };

  const handleUserPasswordUpdate = (values: UpdateUserFormValues) => {
    dispatch(
      updateUserPassword({
        ...values,
        callback: redirectToProfile,
      }),
    );
  };

  const handleUserNameUpdate = async ({displayName}: UpdateUserFormValues) => {
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
    displayEmail: Yup.boolean(),
    displayName: Yup.string().min(3), // add const for this min values
    email: yupEmail,
    newEmail: yupEmail.nope([user.email]).when('displayEmail', {
      is: (val: boolean) => val,
      then: yupEmail.required('Insert new email'),
    }),
    password: yupPassword.required(t('required')),
    newPassword: yupPassword.when('displayEmail', {
      is: (val: boolean) => !val,
      then: yupPassword.required('Insert new password'),
    }),
  });

  const {setFieldValue, handleChange, handleSubmit, errors, values} = useFormik(
    {
      initialValues: {
        displayEmail: true,
        email: user.email,
        newEmail: '',
        password: '',
        newPassword: '',
        displayName: user.userName,
      }, // create initial const
      validationSchema,
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit,
    },
  );

  return (
    <SettingsBox
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
