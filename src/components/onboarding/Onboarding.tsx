import React from 'react';
import {useCallback} from 'react';
import {
  ImageProps,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {Icon} from '../common';
import {IconTypes} from 'src/constants';
import Page, {PAGE_WIDTH} from './Page';
import Dot from './Dot';

export interface PageInterface extends Pick<ImageProps, 'source'> {
  title: string;
  description: string;
}

export const PAGES: PageInterface[] = [
  {
    title: 'Welcome to MoviePicker!',
    description:
      "Don't have any ideas on what to watch? You've come to the right place! Get to know MoviePicker by swiping right!",
    source: require('src/assets/onboarding/start.png'),
  },
  {
    title: 'Popular',
    description:
      'A durable deck featured with a menacing face of a samurai at the center of the underside accompanied with a large red sun motif.',
    source: require('src/assets/onboarding/popular.png'),
  },
  {
    title: 'Details',
    description:
      "You don't have time to consider wheter the graphic on your CSS board would be considered modernist.",
    source: require('src/assets/onboarding/details.png'),
  },
  {
    title: 'Your Profile',
    description:
      'The top of the deck has the same matching graphic in black outline and embodies an overall mellow concave.',
    source: require('src/assets/onboarding/profile.png'),
  },
];

export default function Onboarding() {
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
    if (activeIndex.value === PAGES.length - 1) {
      return;
    }
    scrollRef.current?.scrollTo({x: PAGE_WIDTH * (activeIndex.value + 1)});
  }, [activeIndex.value, scrollRef]);

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
        {PAGES.map((page, index) => (
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
          {PAGES.map((_, index) => {
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
              color="black"
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
    backgroundColor: 'white',
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
});
