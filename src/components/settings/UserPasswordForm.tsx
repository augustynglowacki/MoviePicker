import React from 'react';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import {Route, MIN_PASSWORD_LENGTH} from 'src/constants';
import {useNavigation} from '@react-navigation/native';
import {updateUserPassword} from 'src/redux/user/UserAction';
import {useTranslation} from 'react-i18next';
import {setErrorNull} from 'src/redux/user/UserSlice';
import UserFormTemplate from './UserFormTemplate';
import {UserFormDataTemplate} from 'src/models';

interface PasswordForm {
  email: string;
  password: string;
  newPassword: string;
}

interface Props {
  goBack: () => void;
  error: string;
  loading: boolean;
}

const UserPasswordForm: React.FC<Props> = ({goBack, error, loading}) => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const {t} = useTranslation('form');
  const yupEmail = Yup.string().email(t('email'));
  const yupPassword = Yup.string().min(
    MIN_PASSWORD_LENGTH,
    t('short', {MIN_PASSWORD_LENGTH}),
  );
  const redirectToProfile = () => navigate(Route.PROFILE);

  const validationSchema = Yup.object({
    email: yupEmail,
    password: yupPassword.required(t('required')),
    newPassword: yupPassword.required(t('required')),
  });
  const initialValues: PasswordForm = {
    email: '',
    password: '',
    newPassword: '',
  };
  const onSubmit = () => {
    dispatch(
      updateUserPassword({
        ...values,
        callback: redirectToProfile,
      }),
    );
    dispatch(setErrorNull());
  };

  const {handleChange, errors, values} = useFormik({
    initialValues: initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit,
  });

  const config: UserFormDataTemplate[] = [
    {
      label: 'E-mail',
      initialValue: values.email,
      onChange: handleChange('email'),
      error: errors.email,
      secure: false,
    },
    {
      label: 'Password',
      initialValue: values.password,
      onChange: handleChange('password'),
      error: errors.password,
      secure: true,
    },
    {
      label: 'New password',
      initialValue: values.newPassword,
      onChange: handleChange('newPassword'),
      error: errors.newPassword,
      secure: true,
    },
  ];

  return (
    <UserFormTemplate
      goBack={goBack}
      formData={config}
      headerText="Change Password"
      serverError={error}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
};

export default UserPasswordForm;
