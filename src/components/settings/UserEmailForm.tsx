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
import {updateUserEmail} from 'src/redux/user/UserAction';
import {useTranslation} from 'react-i18next';
import palette from 'src/styles/palette';
import {setErrorNull} from 'src/redux/user/UserSlice';
interface EmailState {
  email: string;
  password: string;
  newEmail: string;
}

interface Props {
  goBackFunction: () => void;
  userEmail: string;
  error: string;
  loading: boolean;
}

const UserEmailForm: React.FC<Props> = ({
  goBackFunction,
  userEmail,
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
    newEmail: yupEmail.nope([userEmail]).when('displayEmail', {
      is: (val: boolean) => val,
      then: yupEmail.required('Insert new email'),
    }),
    password: yupPassword.required(t('required')),
  });
  const initialDisplayNameState: EmailState = {
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
      <SectionHeader text="Change Email" color={palette.white} center />
      <SettingInput
        label="E-mail"
        initialValue={values.email}
        onChange={handleChange('email')}
        error={errors.email}
      />
      <SettingInput
        label="New e-mail"
        initialValue={values.newEmail}
        onChange={handleChange('newEmail')}
        error={errors.newEmail}
      />
      <SettingInput
        label="Password"
        initialValue={values.password}
        secureTextEntry
        onChange={handleChange('password')}
        error={errors.password}
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

export default UserEmailForm;
