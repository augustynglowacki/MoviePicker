import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet, Text, GestureResponderEvent} from 'react-native';
import palette from 'src/styles/palette';
import {SocialButton} from '../common';

interface Props {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
}

const SocialBox: React.FC<Props> = ({onPress}) => {
  const {t} = useTranslation('common');
  return (
    <View style={styles.wrapper}>
      <Text style={styles.social}>{t('signInWith')}</Text>
      <SocialButton
        onPress={onPress}
        icon={require('../../assets/images/google-logo.png')}
      />
    </View>
  );
};

export default SocialBox;
const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 40,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  social: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 15,
    color: palette.white,
  },
});
