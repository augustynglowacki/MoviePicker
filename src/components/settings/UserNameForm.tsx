import React from 'react';
import SettingInput from './SettingInput';
import * as Yup from 'yup';
import {MIN_USERNAME_LENGTH} from 'src/constants/formValues';
import {useFormik} from 'formik';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {setActiveUser, setErrorNull} from 'src/redux/user/UserSlice';
import {IconTypes} from 'src/constants';
import {useNavigation} from '@react-navigation/native';
import {Route} from 'src/constants';
import HeaderBar from '../common/HeaderBar';
import {Container, CustomButton, Message, SectionHeader} from '../common';
import Loading from 'src/screens/Loading';
import palette from 'src/styles/palette';

interface DisplayNameState {
  displayName: string;
}

interface Props {
  goBackFunction: () => void;
  userName: string;
  error: string;
  loading: boolean;
}

const UserNameForm: React.FC<Props> = ({
  goBackFunction,
  userName,
  error,
  loading,
}) => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const redirectToProfile = () => navigate(Route.PROFILE);
  const validationSchema = Yup.object({
    displayName: Yup.string().min(MIN_USERNAME_LENGTH),
  });
  const initialDisplayNameState = {
    displayName: userName,
  };
  const onSubmit = () => {
    const displayNameFirebase = auth().currentUser?.displayName;
    if (values.displayName !== displayNameFirebase) {
      handleUserNameUpdate(values);
    }
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

  const handleUserNameUpdate = async ({displayName}: DisplayNameState) => {
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

  if (loading) {
    return <Loading />;
  }
  return (
    <Container flexStart>
      <HeaderBar leftIcon={leftIcon} />
      <SectionHeader text="Change Username" color={palette.white} center />
      <SettingInput
        label="Username"
        initialValue={values.displayName}
        onChange={handleChange('displayName')}
        error={errors.displayName}
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

export default UserNameForm;
