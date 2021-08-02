import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  Dimensions,
} from 'react-native';
import LinearGradientCover from './LinearGradientCover';
import palette from 'src/styles/palette';
import {API_IMAGES} from '@env';
import {Icon} from '../common';
import {IconTypes} from '../common/Icons';

interface Props {
  poster_path: string;
  navigation: any;
}

const HEIGHT = Dimensions.get('window').height;

const ContentWrapper: React.FC<Props> = ({navigation, poster_path}) => {
  return (
    <ImageBackground
      style={styles.imageBackground}
      source={{uri: `${API_IMAGES}${poster_path}`}}>
      <View style={styles.contentWrapper}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              type={IconTypes.ENTYPO}
              name="chevron-left"
              size={35}
              color={palette.white}
            />
          </TouchableOpacity>
        </View>
        <LinearGradientCover />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: HEIGHT * 0.6,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? 40 : 30,
    marginHorizontal: 16,
  },
  contentWrapper: {
    flex: 1,
  },
});

export default ContentWrapper;
