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
import {IconTypes, OnbardingScreenProp, Route} from 'src/constants';
import Page, {PAGE_WIDTH} from './Page';
import Dot from './Dot';
import palette from 'src/styles/palette';
import {useNavigation} from '@react-navigation/native';

export interface PageInterface extends Pick<ImageProps, 'source'> {
  title: React.ReactNode;
  description: string;
  extra?: React.ReactNode;
}

export default function Onboarding() {
  const {navigate} = useNavigation<OnbardingScreenProp>();

  const go = useCallback(() => navigate(Route.HOME_NAVIGATOR), [navigate]);
  const pages: PageInterface[] = [
    {
      title: (
        <Text>
          Welcome to{'\n'}
          <Text style={styles.markedText}>MoviePicker</Text>
        </Text>
      ),
      description:
        "Don't have any ideas on what to watch? You've come to the right place! Get to know MoviePicker by swiping right!",
      source: require('src/assets/onboarding/start.png'),
    },
    {
      title: (
        <Text>
          See what's{'\n'}
          <Text style={styles.markedText}>Popular</Text>
        </Text>
      ),
      description:
        'Surf through popular movies around the world right now - all of them are on your home screen. Double tap the cover to favourite it!',
      source: require('src/assets/onboarding/popular.png'),
    },
    {
      title: (
        <Text>
          Get into the{'\n'}
          <Text style={styles.markedText}>Details</Text>
        </Text>
      ),
      description:
        'Tap once on the movie cover photo to get to know the details. You can pick a movie to watch later by adding it to your watchlist!',
      source: require('src/assets/onboarding/details.png'),
    },
    {
      title: (
        <Text>
          Create your{'\n'}
          <Text style={styles.markedText}>Profile</Text>
        </Text>
      ),
      description:
        'Customize your profile by adding avatar and background photo. Add movies to your collections - as many as you want!',
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
    marginBottom: 0,
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
