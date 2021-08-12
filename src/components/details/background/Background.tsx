import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import BackgroundGradient from './BackgroundGradient';
import {API_IMAGES} from '@env';
import {HeaderBar} from 'src/components/common';
import {WINDOW_HEIGHT, IconTypes} from 'src/constants';
import {SafeAreaView} from 'react-native-safe-area-context';

interface Props {
  posterPath: string;
  goBack: () => void;
  addToWatchlist: () => void;
}

const Background: React.FC<Props> = ({goBack, addToWatchlist, posterPath}) => {
  return (
    <ImageBackground
      style={styles.imageBackground}
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
  imageBackground: {
    width: '100%',
    height: WINDOW_HEIGHT * 0.6,
  },
  contentWrapper: {
    flex: 1,
  },
});

export default Background;
