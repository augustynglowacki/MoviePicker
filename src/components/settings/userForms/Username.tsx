import React from 'react';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {setErrorNull, userThunkSelector} from 'src/redux/user/UserSlice';
import {
  Route,
  MIN_USERNAME_LENGTH,
  UserNameFormScreenProp,
} from 'src/constants';
import {useNavigation} from '@react-navigation/native';
import {UserFormDataTemplate} from 'src/models';
import Template from 'src/components/settings/userForms/Template';
import {useTranslation} from 'react-i18next';
import {updateUsername} from 'src/redux/user/UserAction';

const Username: React.FC = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation<UserNameFormScreenProp>();
  const {t} = useTranslation('common');
  const backToSettings = () => navigate(Route.SETTINGS);

  const {
    user: {userName},
  } = useSelector(userThunkSelector);

  const validationSchema = Yup.object({
    displayName: Yup.string().min(MIN_USERNAME_LENGTH),
  });

  const initialValues = {
    displayName: userName,
  };

  const onSubmit = () => {
    const displayNameFirebase = auth().currentUser?.displayName;
    if (values.displayName !== displayNameFirebase) {
      handleUserNameUpdate(values.displayName);
    }
  };

  const {handleChange, errors, values} = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit,
  });

  const handleUserNameUpdate = (displayName: string) => {
    dispatch(updateUsername(displayName));
    dispatch(setErrorNull());
    backToSettings();
  };

  const config: UserFormDataTemplate[] = [
    {
      label: 'Username',
      initialValue: values.displayName,
      onChange: handleChange('displayName'),
      error: errors.displayName,
      secure: false,
      autoFocus: true,
    },
  ];

  return (
    <Template
      data={config}
      headerText={t('changeUserName')}
      onSubmit={onSubmit}
    />
  );
};

export default Username;
