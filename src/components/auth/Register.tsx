import {FormikErrors} from 'formik';
import React from 'react';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import Animated, {AnimatedLayout, StretchInX} from 'react-native-reanimated';
import {RegisterForm} from 'src/models';
import palette from 'src/styles/palette';
import {Container, CustomButton, Input, Message} from '../common';

interface Props {
  //type from useFormik handleChange
  onChange: {
    <T_1 = string | React.ChangeEvent<any>>(
      field: T_1,
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  onSubmit: () => void;
  form: RegisterForm;
  errors: FormikErrors<RegisterForm>;
  serverError: string;
  loading: boolean;
}

const RegisterComponent: React.FC<Props> = ({
  onChange,
  onSubmit,
  form,
  serverError,
  errors,
  loading,
}) => {
  const {t} = useTranslation('common');
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
          <Text style={styles.title}>{t('welcomeMessage')}</Text>
          <View style={styles.form}>
            <Input
              label={t('userName')}
              value={form.username}
              onChangeText={onChange('username')}
              error={errors.username}
              autoCapitalize="words"
            />
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
              onPress={onSubmit}
              label={t('register')}
              width="medium"
              variant="primary"
              loading={loading}
            />
            {!!serverError && <Message label={serverError} />}
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
    color: palette.white,
  },
  form: {
    paddingTop: 20,
  },
});
