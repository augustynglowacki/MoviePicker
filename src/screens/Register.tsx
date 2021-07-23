import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import RegisterComponent from '../components/organisms/Register';
import {RegisterForm} from '../models';
import {PROFILE} from '../models/constants/routeNames';
import auth from '@react-native-firebase/auth';
import {createUserWithEmailAndPassword} from '../redux/user/UserAction';
import {useDispatch, useSelector} from 'react-redux';
import {userThunkSelector} from '../redux/user/UserSlice';

const initialState = {
  username: '',
  email: '',
  password: '',
};

const Register = () => {
  //initialization of States
  const [form, setForm] = useState<RegisterForm>(initialState);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errors, setErrors] = useState<RegisterForm>(initialState);
  const {error} = useSelector(userThunkSelector);
  const dispatch = useDispatch();
  // Hook needed to navigate to login after succesful register
  const {navigate} = useNavigation();

  const goToProfile = useCallback(() => {
    navigate(PROFILE);
  }, [navigate]);

  const handleCreateUser = (register: RegisterForm) => {
    dispatch(
      createUserWithEmailAndPassword({
        email: register.email,
        password: register.password,
        displayName: register.username,
      }),
    );
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        goToProfile();
      }
    });
    return subscriber;
  }, [goToProfile]);

  //real-time validation
  const onChange = ({name, value}: {name: string; value: string}) => {
    setForm({...form, [name]: value});
  };

  const onSubmit = () => {
    console.log('form:>>', form);
    handleCreateUser(form);
  };

  return (
    <RegisterComponent
      onSubmit={onSubmit}
      onChange={onChange}
      form={form}
      error={error}
    />
  );
};

export default Register;
