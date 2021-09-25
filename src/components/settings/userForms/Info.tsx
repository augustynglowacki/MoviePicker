import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text} from 'react-native';
// import Animated, {AnimatedLayout, SlideInLeft} from 'react-native-reanimated';
import {Container, HeaderBar, SvgLogo} from 'src/components/common';
import {IconTypes, InfoScreenProp, Route} from 'src/constants';
import palette from 'src/styles/palette';

const Info = () => {
  const {navigate} = useNavigation<InfoScreenProp>();
  const redirectToProfile = () => navigate(Route.SETTINGS);

  const {t} = useTranslation('settings');
  const leftIcon = {
    type: IconTypes.IONICON,
    name: 'ios-arrow-back',
    onPressFunction: () => redirectToProfile(),
  };

  return (
    <Container flexStart disableScroll>
      <HeaderBar leftIcon={leftIcon} title={t('about')} />
      <Container flexStart padding="large">
        {/* <AnimatedLayout>
          <Animated.View entering={SlideInLeft.springify()}> */}
        <SvgLogo style={styles.logoImage} />
        <Text style={styles.text}>{t('infoText')}</Text>
        {/* </Animated.View>
        </AnimatedLayout> */}
      </Container>
    </Container>
  );
};

export default Info;

const styles = StyleSheet.create({
  text: {
    color: palette.white,
    fontSize: 15,
  },
  logoImage: {
    alignSelf: 'center',
    marginBottom: 30,
  },
});
