import React from 'react';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {setActiveUser, setErrorNull} from 'src/redux/user/UserSlice';
import {Route, MIN_USERNAME_LENGTH} from 'src/constants';
import {useNavigation} from '@react-navigation/native';
import {UserFormDataTemplate} from 'src/models';
import Template from 'src/components/settings/userFroms/Template';
import {useTranslation} from 'react-i18next';

interface DisplayNameForm {
  displayName: string;
}

const Username: React.FC = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const {t} = useTranslation('common');
  const redirectToProfile = () => navigate(Route.SETTINGS);

  const validationSchema = Yup.object({
    displayName: Yup.string().min(MIN_USERNAME_LENGTH),
  });

  const initialValues = {
    displayName: '',
  };

  const onSubmit = () => {
    const displayNameFirebase = auth().currentUser?.displayName;
    if (values.displayName !== displayNameFirebase) {
      handleUserNameUpdate(values);
    }
  };

  const {handleChange, errors, values} = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit,
  });

  const handleUserNameUpdate = async ({displayName}: DisplayNameForm) => {
    await auth().currentUser?.updateProfile({
      displayName,
    });
    dispatch(
      setActiveUser({
        userName: displayName,
      }),
    );
    dispatch(setErrorNull());
    redirectToProfile();
  };

  const config: UserFormDataTemplate[] = [
    {
      label: 'Username',
      initialValue: values.displayName,
      onChange: handleChange('displayName'),
      error: errors.displayName,
      secure: false,
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
