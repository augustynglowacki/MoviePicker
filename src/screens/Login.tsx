import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import LoginComponent from '../components/organisms/Login';
import {LoginForm} from '../models';
import {HOME} from '../models/constants/routeNames';
// import LoginComponent from '../../components/organisms/Login';

const initialState = {username: '', password: ''};

const Login = () => {
  const [form, setForm] = useState<LoginForm>(initialState);
  const [errors, setErrors] = useState<LoginForm>(initialState);
  const {navigate} = useNavigation();
  const goToHome = () => navigate(HOME);
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
      goToHome();
    }
  };

  return (
    <LoginComponent
      onSubmit={onSubmit}
      onChange={onChange}
      form={form}
      errors={errors}
    />
  );
};

export default Login;
