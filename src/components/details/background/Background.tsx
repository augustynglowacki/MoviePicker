import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import BackgroundGradient from './BackgroundGradient';
import {API_IMAGES} from '@env';
import {HeaderBar} from 'src/components/common';
import {WINDOW_HEIGHT, IconTypes} from 'src/constants';

interface Props {
  posterPath: string;
  goBack: () => void;
  addToFavorite: () => void;
}

const Background: React.FC<Props> = ({goBack, addToFavorite, posterPath}) => {
  return (
    <ImageBackground
      style={styles.imageBackground}
      source={{uri: `${API_IMAGES}${posterPath}`}}>
      <View style={styles.contentWrapper}>
        <HeaderBar
          leftIcon={{
            type: IconTypes.MATERIAL,
            name: 'arrow-back-ios',
            onPressFunction: goBack,
          }}
          rightIcon={{
            type: IconTypes.IONICON,
            name: 'ios-heart-outline',
            onPressFunction: addToFavorite,
          }}
        />
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
