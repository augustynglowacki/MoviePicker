import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  GestureResponderEvent,
} from 'react-native';
import palette from 'src/styles/palette';
import {SocialButton} from '../common';

interface Props {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
}
//temporary alert facebook SignIn to implement
const handleFacebookSignIn = () => {
  Alert.alert('Sorry... is not available yet', 'Try diffrent sign in method!', [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);
};

const SocialBox: React.FC<Props> = ({onPress}) => {
  const {t} = useTranslation('common');
  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={styles.social}>{t('signInWith')}</Text>
      </View>
      <View style={styles.buttons}>
        <SocialButton
          onPress={onPress}
          icon={require('../../assets/images/google-logo.png')}
        />
        <SocialButton
          onPress={handleFacebookSignIn}
          icon={require('../../assets/images/facebook-logo.png')}
        />
      </View>
    </View>
  );
};

export default SocialBox;
const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  social: {
    textAlign: 'center',
    fontSize: 15,
    color: palette.white,
    marginBottom: 20,
  },
});
