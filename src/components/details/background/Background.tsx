import React from 'react';
import {
  ImageBackground,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import BackgroundGradient from './BackgroundGradient';
import {API_IMAGES} from '@env';
import {HeaderBar} from 'src/components/common';
import {IconTypes, BOTTOM_TABS_HEIGHT} from 'src/constants';
import {
  SafeAreaView,
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

interface Props {
  posterPath: string;
  goBack: () => void;
  addToWatchlist: () => void;
}

const Background: React.FC<Props> = ({goBack, addToWatchlist, posterPath}) => {
  //workaround for height on devices with notch
  const frame = useSafeAreaFrame();
  const {bottom} = useSafeAreaInsets();
  const imageBackgroundStyle: StyleProp<ViewStyle> = {
    width: '100%',
    height: (frame.height - BOTTOM_TABS_HEIGHT - bottom) * 0.6,
  };

  return (
    <ImageBackground
      style={imageBackgroundStyle}
      source={{uri: `${API_IMAGES}${posterPath}`}}>
      <View style={styles.contentWrapper}>
        <SafeAreaView>
          <HeaderBar
            leftIcon={{
              type: IconTypes.IONICON,
              name: 'ios-arrow-back',
              onPressFunction: goBack,
            }}
            rightIcon={{
              type: IconTypes.IONICON,
              name: 'ios-heart-outline',
              onPressFunction: addToWatchlist,
            }}
          />
        </SafeAreaView>
        <BackgroundGradient />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
  },
});

export default Background;
