import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Linking, StyleSheet, Text, View} from 'react-native';
import Animated, {SlideInLeft} from 'react-native-reanimated';
import {Container, HeaderBar} from 'src/components/common';
import {ContactScreenProp, IconTypes, Route} from 'src/constants';
import palette from 'src/styles/palette';
import SettingsOptionBox from '../SettingsOptionBox';
import AuthorBox from './AuthorBox';

const Contact = () => {
  const {navigate} = useNavigation<ContactScreenProp>();
  const backToSettings = () => navigate(Route.SETTINGS);

  const {t} = useTranslation('contact');
  const leftIcon = {
    type: IconTypes.IONICON,
    name: 'ios-arrow-back',
    onPressFunction: () => backToSettings(),
  };
  return (
    <Container flexStart disableScroll>
      <HeaderBar leftIcon={leftIcon} title={t('settings:contact')} />
      <Animated.View entering={SlideInLeft.springify()}>
        <Text style={[styles.subText, styles.padded]}>{t('title')}</Text>
        <SettingsOptionBox
          title={t('mail')}
          subtitle={t('mailSub')}
          onPress={() => Linking.openURL(t('mailPress'))}
          icon={'mail-outline'}
        />
        <SettingsOptionBox
          title={t('store')}
          subtitle={t('storeSub')}
          onPress={() => Linking.openURL(t('storePress'))}
          icon={'logo-google-playstore'}
        />
        <Text style={[styles.subText, styles.padded]}>{t('meetAuthors')}</Text>
        <View style={styles.authorBox}>
          <AuthorBox
            name={t('piotr')}
            source={t('photoPiotr')}
            mail={t('mailPiotr')}
            linkedin={t('linkedinPiotr')}
            github={t('githubPiotr')}
          />
          <AuthorBox
            name={t('augustyn')}
            source={t('photoAugustyn')}
            mail={t('mailAugustyn')}
            linkedin={t('linkedinAugustyn')}
            github={t('githubAugustyn')}
          />
        </View>
      </Animated.View>
    </Container>
  );
};
//
export default Contact;

const styles = StyleSheet.create({
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  text: {
    color: palette.lightWhite,
    fontSize: 12,
  },
  subText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: palette.primary,
  },
  padded: {
    paddingVertical: 5,
    paddingLeft: 10,
  },
  authorBox: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
});
