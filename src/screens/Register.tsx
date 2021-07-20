import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useState} from 'react';
import RegisterComponent from '../components/organisms/Register';
import {RegisterForm} from '../models';
import {LOGIN} from '../models/constants/routeNames';

const initialState = {
  username: '',
  email: '',
  password: '',
};

const Register = () => {
  //initialization of States
  const [form, setForm] = useState<RegisterForm>(initialState);
  const [errors, setErrors] = useState<RegisterForm>(initialState);
  // Hook needed to navigate to login after succesful register
  const {navigate} = useNavigation();
  const navigateTo = () => {
    navigate(LOGIN);
  };
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

    const regexpEmail = /\S+@\S+\.\S+/;
    if (!regexpEmail.test(form.email)) {
      setErrors(currErrors => {
        return {...currErrors, email: 'Please enter a valid email address'};
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
      Object.values(form).length === 3 &&
      Object.values(form).every(item => item.trim().length > 0) &&
      Object.values(errors).every(item => !item)
    ) {
      console.log('form:>>', form);
      navigateTo();
    }
  };

  return (
    <RegisterComponent
      onSubmit={onSubmit}
      onChange={onChange}
      form={form}
      errors={errors}
    />
  );
};

export default Register;
