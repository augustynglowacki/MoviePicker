import React from 'react';
import SettingInput from 'src/components/settings/SettingInput';
import * as Yup from 'yup';
import {MIN_PASSWORD_LENGTH} from 'src/constants/formValues';
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import {IconTypes} from 'src/constants';
import {useNavigation} from '@react-navigation/native';
import {Route} from 'src/constants';
import {HeaderBar} from 'src/components/common';
import {
  Container,
  CustomButton,
  Message,
  SectionHeader,
} from 'src/components/common';
import {updateUserPassword} from 'src/redux/user/UserAction';
import {useTranslation} from 'react-i18next';
import palette from 'src/styles/palette';
import {setErrorNull} from 'src/redux/user/UserSlice';

interface PasswordState {
  email: string;
  password: string;
  newPassword: string;
}

interface Props {
  goBackFunction: () => void;
  error: string;
  loading: boolean;
}

const UserPasswordForm: React.FC<Props> = ({
  goBackFunction,
  error,
  loading,
}) => {
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
  const initialDisplayNameState: PasswordState = {
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
    initialValues: initialDisplayNameState,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit,
  });
  const leftIcon = {
    name: 'arrow-back-ios',
    type: IconTypes.MATERIAL,
    onPressFunction: goBackFunction,
  };

  return (
    <Container flexStart>
      <HeaderBar leftIcon={leftIcon} />
      <SectionHeader text="Change Password" color={palette.white} center />
      <SettingInput
        label="E-mail"
        initialValue={values.email}
        onChange={handleChange('email')}
        error={errors.email}
      />
      <SettingInput
        label="Password"
        initialValue={values.password}
        secureTextEntry
        onChange={handleChange('password')}
        error={errors.password}
      />
      <SettingInput
        label="New Password"
        initialValue={values.newPassword}
        secureTextEntry
        onChange={handleChange('newPassword')}
        error={errors.newPassword}
      />
      <CustomButton
        variant="primary"
        label="Save"
        onPress={onSubmit}
        width="medium"
        loading={loading}
      />
      {!!error && <Message label={error} />}
    </Container>
  );
};

export default UserPasswordForm;
