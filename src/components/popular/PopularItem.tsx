import React, {useCallback, useRef} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Alert,
  Dimensions,
  Image,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {API_IMAGES} from '@env';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import palette from 'src/styles/palette';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import RatingBox from '../common/RatingBox';
import GenreBox from './GenreBox';
import {
  Route,
  WINDOW_HEIGHT,
  BOTTOM_TABS_HEIGHT,
  PopularScreenProp,
} from 'src/constants';
import {Popular} from 'src/models';
import {setFavorite} from 'src/redux/collections/CollectionsActions';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {TapGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';

interface Props {
  movie: Popular;
  loggedIn: boolean;
  loading: boolean;
}

const PopularItem: React.FC<Props> = React.memo(
  ({movie, loggedIn, loading}) => {
    const {t} = useTranslation('common');
    const {navigate} = useNavigation<PopularScreenProp>();
    const dispatch = useDispatch();
    const {posterPath, title, id, voteAverage, genres, contentType} = movie;
    //workaround for height on devices with notch
    const frame = useSafeAreaFrame();
    const {bottom} = useSafeAreaInsets();

    const phoneHeight = frame.height - BOTTOM_TABS_HEIGHT - bottom;
    const wrapperStyle: StyleProp<ViewStyle> = {
      width: '100%',
      height: phoneHeight,
      justifyContent: 'center',
      alignItems: 'center',
    };

    const alert = useCallback(() => {
      Alert.alert(t('login'), t('loginSuggestion'), [
        {
          text: t('cancel'),
          onPress: () => {},
        },
        {
          text: t('ok'),
          onPress: () => navigate(Route.AUTH),
        },
      ]);
    }, [navigate, t]);

    //heart animation, touch logic
    const scale = useSharedValue(0);
    const doubleTapRef = useRef();
    const rStyle = useAnimatedStyle(() => ({
      transform: [{scale: Math.max(scale.value, 0)}],
    }));
    const onDoubleTap = useCallback(() => {
      if (!loggedIn) {
        alert();
        return;
      }
      if (loggedIn) {
        scale.value = withSpring(1, undefined, isFinished => {
          if (isFinished) {
            scale.value = withDelay(500, withSpring(0));
          }
        });
        dispatch(setFavorite(movie));
      }
    }, [alert, dispatch, loggedIn, movie, scale]);
    const onSingleTap = useCallback(() => {
      navigate(Route.DETAILS, {
        id,
        posterPath,
        contentType,
      });
    }, [contentType, id, navigate, posterPath]);

    return (
      <View style={wrapperStyle}>
        <View style={StyleSheet.absoluteFillObject}>
          <Image
            source={{uri: `${API_IMAGES}${posterPath}`}}
            style={[StyleSheet.absoluteFillObject]}
            blurRadius={50}
          />
          <LinearGradient
            colors={[
              'rgba(0,0,0,0.05)',
              'rgba(0,0,0,0.05)',
              'rgba(0,0,0,0.1)',
              'rgba(0,0,0,0.15)',
              'rgba(0,0,0,0.2)',
              'rgba(0,0,0,0.25)',
            ]}
            start={{x: 0, y: 1}}
            end={{x: 0, y: 0}}
            style={styles.linearBackground}
          />
        </View>
        <TapGestureHandler waitFor={doubleTapRef} onActivated={onSingleTap}>
          <TapGestureHandler
            maxDelayMs={250}
            ref={doubleTapRef}
            numberOfTaps={2}
            onActivated={onDoubleTap}>
            <Animated.View>
              <View style={styles.movieContainer}>
                {loading && (
                  <ActivityIndicator
                    color={palette.primary}
                    style={styles.loading}
                    size={40}
                  />
                )}
                <ImageBackground
                  source={{uri: `${API_IMAGES}${posterPath}`}}
                  style={styles.image}
                  imageStyle={styles.image}
                />
                <LinearGradient
                  colors={[
                    'rgba(0,0,0,0.05)',
                    'rgba(0,0,0,0.1)',
                    'rgba(0,0,0,0.2)',
                    'rgba(0,0,0,0.4)',
                    'rgba(0,0,0,0.5)',
                    'rgba(0,0,0,0.65)',
                  ]}
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}
                  style={styles.linearGradient}
                />
                <Animated.Image
                  source={require('src/assets/images/like.png')}
                  style={[styles.heart, rStyle]}
                  resizeMode={'center'}
                />
                <View style={styles.movieInfo}>
                  <Text style={styles.title}>{title}</Text>
                  <View style={styles.genres}>
                    {genres.slice(0, 2).map(genre => (
                      <GenreBox key={genre} name={genre} />
                    ))}
                  </View>
                  {!!voteAverage && <RatingBox voteAverage={voteAverage} />}
                </View>
              </View>
            </Animated.View>
          </TapGestureHandler>
        </TapGestureHandler>
      </View>
    );
  },
);

export default PopularItem;

const {width} = Dimensions.get('screen');
const imageW = width * 0.71;
const imageH = imageW * 1.57;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: WINDOW_HEIGHT - BOTTOM_TABS_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieContainer: {
    width: imageW,
    height: imageH,
    borderRadius: 16,
    shadowOpacity: 0.9,
    shadowRadius: 60,
    shadowColor: palette.strongBlack,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  overflow: {
    overflow: 'visible',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 16,
    backgroundColor: palette.strongBlack,
  },
  linearGradient: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    borderRadius: 16,
  },
  linearBackground: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  movieInfo: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  title: {
    fontSize: 19,
    color: palette.white,
    textAlign: 'center',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    marginHorizontal: 4,
  },
  genres: {
    marginTop: 32,
    maxWidth: 350,
    fontSize: 14,
    color: palette.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  loading: {
    zIndex: 100,
  },
  heartContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heart: {
    width: width * 0.3,
    height: width * 0.3,
    zIndex: 10,
    shadowOffset: {width: 0, height: 20},
    shadowOpacity: 0.35,
    shadowRadius: 35,
  },
});
