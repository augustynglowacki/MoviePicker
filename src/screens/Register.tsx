import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import RegisterComponent from '../components/organisms/Register';
import {RegisterForm} from '../models';
import {PROFILE} from '../models/constants/routeNames';
import {createUser} from '../redux/user/UserAction';
import auth from '@react-native-firebase/auth';
import {setActiveUser} from '../redux/user/UserSlice';

const initialState = {
  username: '',
  email: '',
  password: '',
};

const Register = () => {
  //initialization of States
  const [form, setForm] = useState<RegisterForm>(initialState);
  const [errors, setErrors] = useState<RegisterForm>(initialState);
  const dispatch = useDispatch();
  // Hook needed to navigate to login after succesful register
  const {navigate} = useNavigation();
  const goToProfile = () => navigate(PROFILE);

  const handleCreateUser = () => {
    dispatch(
      createUser({
        email: 'adrianNiglus78@ggg.pl',
        password: 'TajneHasło123',
        displayName: 'User12333322',
      }),
    );
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      console.log('useEffect', user);
      if (user) {
        dispatch(
          setActiveUser({
            email: user.email,
            userName: user.displayName,
          }),
        );
        goToProfile();
      }
    });
    return subscriber;
  });
  //real-time validation
  const onChange = ({name, value}: {name: string; value: string}) => {
    setForm({...form, [name]: value});
    if (value !== '') {
      setErrors(currErrors => {
        return {...currErrors, [name]: ''};
      });
    }
    if (value === '') {
      setErrors(currErrors => {
        return {...currErrors, [name]: 'This field is required'};
      });
    }
  };

  // const onSubmit = () => {
  //   //onClick validation
  //   if (!form.username) {
  //     setErrors(currErrors => {
  //       return {...currErrors, username: 'Please add the username'};
  //     });
  //   }

  //   const regexpEmail = /\S+@\S+\.\S+/;
  //   if (!regexpEmail.test(form.email)) {
  //     setErrors(currErrors => {
  //       return {...currErrors, email: 'Please enter a valid email address'};
  //     });
  //   }
  //   if (form.password.length < 8) {
  //     setErrors(currErrors => {
  //       return {
  //         ...currErrors,
  //         password: 'Password has to be at least 8 characters',
  //       };
  //     });
  //     return;
  //   }

  //   if (
  //     Object.values(form).length === 3 &&
  //     Object.values(form).every(item => item.trim().length > 0) &&
  //     Object.values(errors).every(item => !item)
  //   ) {
  //     console.log('form:>>', form);
  //     navigateTo();
  //   }
  // };

  return (
    <RegisterComponent
      onSubmit={handleCreateUser}
      onChange={onChange}
      form={form}
      errors={errors}
    />
  );
};

export default Register;
