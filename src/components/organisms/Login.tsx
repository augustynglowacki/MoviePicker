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
import {useTranslation} from 'react-i18next';
import Message from '../atoms/Message';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
interface IProps {
  onChange: ({name, value}: {name: string; value: string}) => void;
  onSubmit: () => void;
  signUpWithGoogle: () => void;
  form: LoginForm;
  error: string;
}
const LoginComponent = ({
  onChange,
  onSubmit,
  form,
  error,
  signUpWithGoogle,
}: IProps) => {
  const {t} = useTranslation();
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
          <Text style={styles.title}>{t('common:welcomeMessage')}</Text>
          <View style={styles.form}>
            <Input
              label={t('common:email')}
              value={form.email}
              onChangeText={value => onChange({name: 'email', value})}
            />
            <Input
              label={t('common:password')}
              value={form.password}
              onChangeText={value => onChange({name: 'password', value})}
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
              label={t('common:login')}
              width="small"
              variant="primary"
              onPress={onSubmit}
            />
            <GoogleSigninButton
              onPress={signUpWithGoogle}
              style={styles.googleButton}
            />
            {error ? <Message label={error} /> : null}
          </View>
          <View>
            <Text style={styles.register}>
              {t('common:registerSuggestion')}
            </Text>
            <CustomButton
              label={t('common:register')}
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
  googleButton: {
    alignSelf: 'center',
    width: '40%',
    height: 45,
  },
});
