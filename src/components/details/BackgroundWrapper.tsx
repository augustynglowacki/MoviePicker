import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  Dimensions,
} from 'react-native';
import BackgroundGradient from './BackgroundGradient';
import palette from 'src/styles/palette';
import {API_IMAGES} from '@env';
import {Icon} from '../common';
import {IconTypes} from 'src/constants';

interface Props {
  poster_path: string;
  goBack: () => void;
}

const HEIGHT = Dimensions.get('window').height;

const BackgroundWrapper: React.FC<Props> = ({goBack, poster_path}) => {
  return (
    <ImageBackground
      style={styles.imageBackground}
      source={{uri: `${API_IMAGES}${poster_path}`}}>
      <View style={styles.contentWrapper}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity onPress={goBack}>
            <Icon
              type={IconTypes.ENTYPO}
              name="chevron-left"
              size={35}
              color={palette.white}
            />
          </TouchableOpacity>
        </View>
        <BackgroundGradient />
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

export default BackgroundWrapper;
