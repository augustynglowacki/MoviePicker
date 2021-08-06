import React from 'react';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {setActiveUser, setErrorNull} from 'src/redux/user/UserSlice';
import {Route, MIN_USERNAME_LENGTH} from 'src/constants';
import {useNavigation} from '@react-navigation/native';
import {UserFormDataTemplate} from 'src/models';
import UserFormTemplate from './UserFormTemplate';

interface DisplayNameForm {
  displayName: string;
}

interface Props {
  goBack: () => void;
  userName: string;
  error: string;
  loading: boolean;
}

const UserNameForm: React.FC<Props> = ({goBack, userName, error, loading}) => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const redirectToProfile = () => navigate(Route.PROFILE);

  const validationSchema = Yup.object({
    displayName: Yup.string().min(MIN_USERNAME_LENGTH),
  });

  const initialValues = {
    displayName: userName,
  };

  const onSubmit = () => {
    const displayNameFirebase = auth().currentUser?.displayName;
    if (values.displayName !== displayNameFirebase) {
      handleUserNameUpdate(values);
    }
  };

  const {handleChange, errors, values} = useFormik({
    initialValues: initialValues,
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
    <UserFormTemplate
      formData={config}
      headerText="Change username"
      serverError={error}
      goBack={goBack}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
};

export default UserNameForm;
