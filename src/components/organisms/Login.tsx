import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import colors from '../../assets/theme/colors';
import {LoginForm} from '../../models';
import {REGISTER} from '../../models/constants/routeNames';
import Container from '../atoms/Container';
import CustomButton from '../atoms/CustomButton';
import Input from '../atoms/Input';
import Animated, {AnimatedLayout, FlipInXDown} from 'react-native-reanimated';
interface IProps {
  onChange: ({name, value}: {name: string; value: string}) => void;
  onSubmit: () => void;
  form: LoginForm;
  errors: LoginForm;
}
const LoginComponent = ({onChange, onSubmit, form, errors}: IProps) => {
  const {navigate} = useNavigation();
  const goToRegister = () => navigate(REGISTER);
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const handleHide = () => setHiddenPassword(!hiddenPassword);
  return (
    <Container withKeyboard withPadding>
      <AnimatedLayout>
        <Animated.View entering={FlipInXDown.springify()}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logoImage}
          />
        </Animated.View>

        <View>
          <Text style={styles.title}>Welcome to MoviePicker!</Text>
          <View style={styles.form}>
            <Input
              label="Username"
              value={form.username}
              onChangeText={value => onChange({name: 'username', value})}
              error={errors.username}
            />
            <Input
              label="Password"
              value={form.password}
              onChangeText={value => onChange({name: 'password', value})}
              error={errors.password}
              hidePassword={hiddenPassword}
              right={
                <TextInput.Icon
                  name="eye"
                  color={colors.grey}
                  onPress={handleHide}
                />
              }
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
      </AnimatedLayout>
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
