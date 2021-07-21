import * as React from 'react';
import {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import Animated, {AnimatedLayout, StretchInX} from 'react-native-reanimated';
import colors from '../../assets/theme/colors';
import {RegisterForm} from '../../models';
import Container from '../atoms/Container';
import CustomButton from '../atoms/CustomButton';
import Input from '../atoms/Input';

interface IProps {
  onChange: ({name, value}: {name: string; value: string}) => void;
  onSubmit: () => void;
  form: RegisterForm;
  errors: RegisterForm;
}

const RegisterComponent = ({onChange, onSubmit, form, errors}: IProps) => {
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const handleHide = () => setHiddenPassword(!hiddenPassword);
  return (
    <Container withKeyboard withPadding>
      <AnimatedLayout>
        <Animated.View entering={StretchInX.springify()}>
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
              label="Email"
              value={form.email}
              onChangeText={value => onChange({name: 'email', value})}
              error={errors.email}
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
              onPress={onSubmit}
              label="Register"
              width="small"
              variant="primary"
            />
          </View>
        </View>
      </AnimatedLayout>
    </Container>
  );
};

export default RegisterComponent;

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
  },
});
