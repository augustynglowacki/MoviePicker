import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useState} from 'react';
import RegisterComponent from '../components/organisms/Register';
import {RegisterForm} from '../models';

interface IProps {
  name: string;
  value: string;
}
const initialState = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const Register = () => {
  //initialization of States
  const [form, setForm] = useState<RegisterForm>(initialState);
  const [errors, setErrors] = useState<RegisterForm>(initialState);
  // Hook needed to navigate to login after succesful register
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {navigate} = useNavigation();

  //real-time validation
  const onChange = ({name, value}: IProps) => {
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
