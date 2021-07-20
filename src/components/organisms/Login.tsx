import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import colors from '../../assets/theme/colors';
import {LoginForm} from '../../models';
import {REGISTER} from '../../models/constants/routeNames';
import Container from '../atoms/Container';
import CustomButton from '../atoms/CustomButton';
import Input from '../atoms/Input';

interface IProps {
  onChange: ({name, value}: {name: string; value: string}) => void;
  onSubmit: () => void;
  form: LoginForm;
  errors: LoginForm;
}
const LoginComponent = ({onChange, onSubmit, form, errors}: IProps) => {
  const {navigate} = useNavigation();
  const goToRegister = () => navigate(REGISTER);
  return (
    <Container withKeyboard withPadding>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logoImage}
      />
      <View>
        <Text style={styles.title}>Welcome to MoviePicker!</Text>
        <View style={styles.form}>
          <Input
            label="Username"
            iconPosition="right"
            placeholder="Enter Username"
            value={form.username}
            onChangeText={value => onChange({name: 'username', value})}
            error={errors.username}
          />
          <Input
            label="Password"
            placeholder="Enter Password"
            value={form.password}
            onChangeText={value => onChange({name: 'password', value})}
            error={errors.password}
            secureTextEntry={true}
            icon={<Text>Show</Text>}
          />
          <CustomButton
            label="Login"
            width="small"
            variant="primary"
            onPress={onSubmit}
          />
        </View>
        <View>
          <Text style={styles.register}>First time here?</Text>
          <CustomButton
            label="Register"
            variant="secondary"
            onPress={goToRegister}
            width="small"
          />
        </View>
      </View>
    </Container>
  );
};

export default LoginComponent;

const styles = StyleSheet.create({
  logoImage: {
    height: 120,
    width: 120,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    paddingTop: 10,
    color: colors.white,
  },
  form: {
    paddingTop: 20,
    paddingBottom: 35,
  },
  register: {
    textAlign: 'center',
    fontSize: 17,
    color: colors.white,
  },
});
