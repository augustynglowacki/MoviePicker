import React from 'react';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {
  Route,
  MIN_PASSWORD_LENGTH,
  UserEmailFormScreenProp,
} from 'src/constants';
import {useNavigation} from '@react-navigation/native';
import {updateUserEmail} from 'src/redux/user/UserAction';
import {useTranslation} from 'react-i18next';
import {setErrorNull, userThunkSelector} from 'src/redux/user/UserSlice';
import {UserFormDataTemplate} from 'src/models';
import Template from 'src/components/settings/userForms/Template';
interface EmailForm {
  email: string;
  password: string;
  newEmail: string;
}

const Email: React.FC = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation<UserEmailFormScreenProp>();
  const {user} = useSelector(userThunkSelector);
  const {t} = useTranslation(['form', 'common']);
  const yupEmail = Yup.string().email(t('email'));
  const yupPassword = Yup.string().min(
    MIN_PASSWORD_LENGTH,
    t('short', {MIN_PASSWORD_LENGTH}),
  );
  const backToSettings = () => navigate(Route.SETTINGS);

  const validationSchema = Yup.object({
    email: yupEmail,
    newEmail: yupEmail.nope([user.email]).when('displayEmail', {
      is: (val: boolean) => val,
      then: yupEmail.required(t('required')),
    }),
    password: yupPassword.required(t('required')),
  });

  const {
    user: {email},
  } = useSelector(userThunkSelector);

  const initialValues: EmailForm = {
    email: email,
    password: '',
    newEmail: '',
  };

  const onSubmit = () => {
    dispatch(
      updateUserEmail({
        ...values,
        callback: backToSettings,
      }),
    );
    dispatch(setErrorNull());
  };

  const {handleChange, errors, values} = useFormik({
    initialValues,
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
      editable: false,
    },
    {
      label: 'New e-mail',
      initialValue: values.newEmail,
      onChange: handleChange('newEmail'),
      error: errors.newEmail,
      secure: false,
      autoFocus: true,
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
    <Template
      data={config}
      headerText={t('common:changeEmail')}
      onSubmit={onSubmit}
    />
  );
};

export default Email;
