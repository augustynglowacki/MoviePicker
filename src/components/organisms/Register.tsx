import * as React from 'react';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import Animated, {AnimatedLayout, StretchInX} from 'react-native-reanimated';
import colors from '../../assets/theme/colors';
import {RegisterForm} from '../../models';
import Container from '../atoms/Container';
import CustomButton from '../atoms/CustomButton';
import Input from '../atoms/Input';
import Message from '../atoms/Message';

interface IProps {
  onChange: ({name, value}: {name: string; value: string}) => void;
  onSubmit: () => void;
  form: RegisterForm;
  error: string;
}

const RegisterComponent = ({onChange, onSubmit, form, error}: IProps) => {
  const {i18n} = useTranslation();
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
          <Text style={styles.title}>{i18n.t('common:welcomeMessage')}</Text>
          <View style={styles.form}>
            <Input
              label={i18n.t('common:userName')}
              value={form.username}
              onChangeText={value => onChange({name: 'username', value})}
            />
            <Input
              label={i18n.t('common:email')}
              value={form.email}
              onChangeText={value => onChange({name: 'email', value})}
            />
            <Input
              label={i18n.t('common:password')}
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
              onPress={onSubmit}
              label={i18n.t('common:register')}
              width="small"
              variant="primary"
            />
            {error ? <Message label={error} /> : null}
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
