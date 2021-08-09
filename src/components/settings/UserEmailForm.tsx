import React from 'react';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {Route, MIN_PASSWORD_LENGTH} from 'src/constants';
import {useNavigation} from '@react-navigation/native';
import {updateUserEmail} from 'src/redux/user/UserAction';
import {useTranslation} from 'react-i18next';
import {setErrorNull, userThunkSelector} from 'src/redux/user/UserSlice';
import {UserFormDataTemplate} from 'src/models';
import UserFormTemplate from './UserFormTemplate';
interface EmailForm {
  email: string;
  password: string;
  newEmail: string;
}

const UserEmailForm: React.FC = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const {user} = useSelector(userThunkSelector);
  const {t} = useTranslation(['form', 'common']);
  const yupEmail = Yup.string().email(t('email'));
  const yupPassword = Yup.string().min(
    MIN_PASSWORD_LENGTH,
    t('short', {MIN_PASSWORD_LENGTH}),
  );
  const redirectToProfile = () => navigate(Route.PROFILE);

  const validationSchema = Yup.object({
    email: yupEmail,
    newEmail: yupEmail.nope([user.email]).when('displayEmail', {
      is: (val: boolean) => val,
      then: yupEmail.required('Insert new email'),
    }),
    password: yupPassword.required(t('required')),
  });

  const initialValues: EmailForm = {
    email: '',
    password: '',
    newEmail: '',
  };

  const onSubmit = () => {
    dispatch(
      updateUserEmail({
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
      label: 'New e-mail',
      initialValue: values.newEmail,
      onChange: handleChange('newEmail'),
      error: errors.newEmail,
      secure: false,
    },
    {
      label: 'Password',
      initialValue: values.password,
      onChange: handleChange('password'),
      error: errors.password,
      secure: true,
    },
  ];

  return (
    <UserFormTemplate
      formData={config}
      headerText={t('common:changeEmail')}
      onSubmit={onSubmit}
    />
  );
};

export default UserEmailForm;
