import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import Animated, {AnimatedLayout, FlipInXDown} from 'react-native-reanimated';
import {useTranslation} from 'react-i18next';
import {FormikErrors} from 'formik';
import SocialBox from './SocialBox';
import RegisterInfo from './RegisterInfo';
import {Container, CustomButton, Input, Message} from '../common';
import {LoginForm} from 'src/models';
import {REGISTER} from 'src/models/constants/routeNames';
import palette from 'src/styles/palette';

interface IProps {
  //type from useFormik handleChange
  onChange: {
    <T_1 = string | React.ChangeEvent<any>>(
      field: T_1,
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  onSubmit: () => void;
  signUpWithGoogle: () => void;
  form: LoginForm;
  errors: FormikErrors<LoginForm>;
  serverError: string;
  loading: boolean;
}
const LoginComponent = ({
  onChange,
  onSubmit,
  form,
  serverError,
  errors,
  signUpWithGoogle,
  loading,
}: IProps) => {
  const {t} = useTranslation('common');
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
          <Text style={styles.title}>{t('welcomeMessage')}</Text>
          <View style={styles.form}>
            <Input
              label={t('email')}
              value={form.email}
              onChangeText={onChange('email')}
              error={errors.email}
              autoCompleteType="email"
              keyboardType="email-address"
            />
            <Input
              label={t('password')}
              value={form.password}
              onChangeText={onChange('password')}
              secureTextEntry={hiddenPassword}
              error={errors.password}
              right={
                <TextInput.Icon
                  name="eye"
                  color={palette.grey}
                  onPress={handleHide}
                />
              }
            />
            <CustomButton
              label={t('login')}
              width="small"
              variant="primary"
              onPress={onSubmit}
              loading={loading}
            />
            {serverError ? <Message label={serverError} /> : null}
            <SocialBox onPress={signUpWithGoogle} />
            <RegisterInfo onPress={goToRegister} />
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
    color: palette.white,
  },
  form: {
    paddingTop: 20,
    paddingBottom: 35,
  },
});
