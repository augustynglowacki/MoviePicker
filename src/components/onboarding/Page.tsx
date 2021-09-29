import React from 'react';
import {
  Dimensions,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {BOTTOM_TABS_HEIGHT} from 'src/constants';
import palette from 'src/styles/palette';
import {PageInterface} from './Onboarding';

interface PageProps {
  page: PageInterface;
  translateX: Animated.SharedValue<number>;
  index: number;
}
//workaround for height on devices with notch
const {width: PAGE_WIDTH} = Dimensions.get('window');
const Page: React.FC<PageProps> = ({page, translateX, index}) => {
  const frame = useSafeAreaFrame();
  const {bottom} = useSafeAreaInsets();
  const PAGE_HEIGHT = frame.height - BOTTOM_TABS_HEIGHT - bottom;
  const container: StyleProp<ViewStyle> = {
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 46,
  };
  const image: StyleProp<ImageStyle> = {
    height: PAGE_HEIGHT * 0.25,
    aspectRatio: 1,
    position: 'absolute',
  };

  const inputRange = [
    (index - 1) * PAGE_WIDTH,
    index * PAGE_WIDTH,
    (index + 1) * PAGE_WIDTH,
  ];

  const rImageStyle = useAnimatedStyle(() => {
    const progress = interpolate(
      translateX.value,
      inputRange,
      [0, 0, 1],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
      transform: [
        {
          rotate: `${progress * Math.PI}rad`,
        },
      ],
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
    };
  });

  return (
    <View style={container}>
      <View style={styles.circleContainer}>
        <Animated.Image
          source={page.source}
          style={[image, rImageStyle]}
          resizeMode={'contain'}
        />
      </View>
      <Animated.View style={rTextStyle}>
        <Text style={styles.title}>{page.title}</Text>
        <Text style={styles.description}>{page.description}</Text>
      </Animated.View>
      {page.extra}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: '700',
    marginBottom: 15,
    color: palette.white,
  },
  circleContainer: {
    width: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  description: {
    textAlign: 'center',
    fontSize: 14,
    color: '#F8F8F8',
    marginBottom: 40,
  },
});

export {PAGE_WIDTH};

export default Page;
