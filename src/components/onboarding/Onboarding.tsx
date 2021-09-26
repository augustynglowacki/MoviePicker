import React from 'react';
import {useCallback} from 'react';
import {
  ImageProps,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {CustomButton, Icon} from '../common';
import {IconTypes, OnboardingScreenProp, Route} from 'src/constants';
import Page, {PAGE_WIDTH} from './Page';
import Dot from './Dot';
import palette from 'src/styles/palette';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

export interface PageInterface extends Pick<ImageProps, 'source'> {
  title: React.ReactNode;
  description: string;
  extra?: React.ReactNode;
}

export default function Onboarding() {
  const {navigate} = useNavigation<OnboardingScreenProp>();
  const {t} = useTranslation('onboarding');
  const go = useCallback(() => navigate(Route.HOME_NAVIGATOR), [navigate]);
  const pages: PageInterface[] = [
    {
      title: (
        <Text>
          {t('welcome')}
          <Text style={styles.markedText}> {t('welcomeTitle')}</Text>
        </Text>
      ),
      description: t('welcomeDes'),
      source: require('src/assets/onboarding/start.png'),
    },
    {
      title: (
        <Text>
          {t('popularTitle')}
          <Text style={styles.markedText}>{t('popular')}</Text>
        </Text>
      ),
      description: t('popularDes'),
      source: require('src/assets/onboarding/popular.png'),
    },
    {
      title: (
        <Text>
          {t('detailsTitle')}
          <Text style={styles.markedText}>{t('details')}</Text>
        </Text>
      ),
      description: t('detailsDes'),
      source: require('src/assets/onboarding/details.png'),
    },
    {
      title: (
        <Text>
          {t('profileTitle')}
          <Text style={styles.markedText}> {t('profile')}</Text>
        </Text>
      ),
      description: t('profileDes'),
      source: require('src/assets/onboarding/profile.png'),
      extra: <CustomButton onPress={go} label="Get started" />,
    },
  ];
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      translateX.value = event.contentOffset.x;
    },
  });

  const activeIndex = useDerivedValue(() => {
    return Math.round(translateX.value / PAGE_WIDTH);
  }, [translateX.value]);

  const scrollRef = useAnimatedRef<ScrollView>();

  const onIconPress = useCallback(() => {
    if (activeIndex.value === pages.length - 1) {
      go();
      return;
    }
    scrollRef.current?.scrollTo({x: PAGE_WIDTH * (activeIndex.value + 1)});
  }, [pages.length, activeIndex.value, scrollRef, go]);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef as any}
        style={styles.flexed}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}>
        {pages.map((page, index) => (
          <Page
            key={index.toString()}
            page={page}
            translateX={translateX}
            index={index}
          />
        ))}
      </Animated.ScrollView>
      <View style={styles.footer}>
        {/* Paginator */}
        <View style={[styles.fillCenter, styles.pagination]}>
          {pages.map((_, index) => {
            return (
              <Dot
                key={index.toString()}
                index={index}
                activeDotIndex={activeIndex}
              />
            );
          })}
        </View>
        {/* iconContainer */}
        <View style={styles.icon}>
          <TouchableOpacity onPress={onIconPress}>
            <Icon
              name="arrowright"
              size={24}
              color={palette.primary}
              type={IconTypes.ANT}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.strongBlack,
  },
  markedText: {
    color: palette.primary,
  },
  footer: {
    height: 50,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fillCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pagination: {
    flexDirection: 'row',
    maxWidth: 170,
  },
  text: {
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1.7,
    fontWeight: '500',
  },
  flexed: {flex: 1},
  icon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 70,
  },
  startLabel: {
    fontSize: 17,
    color: palette.white,
    justifyContent: 'center',
    paddingTop: 20,
    paddingHorizontal: 3,
  },
  startBox: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
