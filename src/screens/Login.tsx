import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import LoginComponent from '../components/organisms/Login';
import {LoginForm} from '../models';
import {PROFILE} from '../models/constants/routeNames';
import auth from '@react-native-firebase/auth';
import {loginUser} from '../redux/user/UserAction';
import {useDispatch} from 'react-redux';

// import LoginComponent from '../../components/organisms/Login';

const initialState = {username: '', password: ''};

const Login = () => {
  const [form, setForm] = useState<LoginForm>(initialState);
  const [errors, setErrors] = useState<LoginForm>(initialState);
  const {navigate} = useNavigation();

  const goToProfile = React.useCallback(() => {
    navigate(PROFILE);
  }, [navigate]);

  const dispatch = useDispatch();

  const handleLoginUser = () => {
    dispatch(
      loginUser({
        email: 'piotrrrdd7@ggg.pl',
        password: 'TajneHasło123',
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = () => {
    //onClick validation
    if (!form.username) {
      setErrors(currErrors => {
        return {...currErrors, username: 'Please add the username'};
      });
    }
    if (form.password.length < 8) {
      setErrors(currErrors => {
        return {
          ...currErrors,
          password: 'Password has to be at least 8 characters',
        };
      });
      return;
    }

    if (
      Object.values(form).length === 2 &&
      Object.values(form).every(item => item.trim().length > 0) &&
      Object.values(errors).every(item => !item)
    ) {
      console.log('form:>>', form);
      goToProfile();
    }
  };

  return (
    <LoginComponent
      onSubmit={handleLoginUser}
      onChange={onChange}
      form={form}
      errors={errors}
    />
  );
};

export default Login;
