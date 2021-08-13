import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Alert,
  Dimensions,
  Image,
  StyleProp,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {API_IMAGES} from '@env';
import {StyleSheet} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import palette from 'src/styles/palette';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {userThunkSelector} from 'src/redux/user/UserSlice';
import RatingBox from '../common/RatingBox';
import Heart from '../common/Heart';
import GenreBox from './GenreBox';
import {Route, WINDOW_HEIGHT, BOTTOM_TABS_HEIGHT} from 'src/constants';
import {Popular} from 'src/models';
import {Action} from '../common';
import {setWatchlist} from 'src/redux/collections/CollectionsActions';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
interface Props {
  movie: Popular;
}

const PopularItem: React.FC<Props> = React.memo(({movie}) => {
  const {t} = useTranslation('common');
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const {posterPath, title, id, voteAverage, genres, contentType} = movie;
  const doubleTapRef = useRef();
  const [isLiked, setLiked] = useState<boolean>(false);
  //workaround for height on devices with notch
  const frame = useSafeAreaFrame();
  const {bottom} = useSafeAreaInsets();

  const wrapperStyle: StyleProp<ViewStyle> = {
    width: '100%',
    height: frame.height - BOTTOM_TABS_HEIGHT - bottom,
    justifyContent: 'center',
    alignItems: 'center',
  };

  const {
    user: {email},
  } = useSelector(userThunkSelector);

  const addToWatchlist = () => {
    if (email) {
      if (!isLiked) {
        setLiked(true);
        dispatch(setWatchlist(movie));
        setTimeout(() => setLiked(false), 1000);
      }
    } else {
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
    }
  };

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
      <TapGestureHandler
        waitFor={doubleTapRef}
        onActivated={() => {
          navigate(Route.DETAILS, {
            id,
            posterPath,
            contentType,
          });
        }}>
        <TapGestureHandler
          maxDelayMs={400}
          ref={doubleTapRef}
          numberOfTaps={2}
          onActivated={addToWatchlist}>
          <View style={styles.movieContainer}>
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
            {!!isLiked && (
              <View style={styles.heart}>
                <Heart />
              </View>
            )}

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
        </TapGestureHandler>
      </TapGestureHandler>
      <View style={styles.actions}>
        <Action
          label={t('movies:favorite')}
          icon={'heart'}
          onPress={() => console.log('action')}
          isActive={false}
        />
        <Action
          label={t('movies:watched')}
          icon={'checkmark'}
          onPress={() => console.log('action')}
          isActive={false}
        />
        <Action
          label={t('movies:watchlist')}
          icon={'tv'}
          onPress={() => console.log('action')}
          isActive={false}
        />
      </View>
    </View>
  );
});

export default PopularItem;
const {width} = Dimensions.get('screen');
const imageW = width * 0.69;
const imageH = imageW * 1.52;

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
    shadowRadius: 20,
    shadowColor: palette.strongBlack,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
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
  actions: {
    position: 'absolute',
    bottom: 16,
    flexDirection: 'row',
    zIndex: 1000,
  },
  heart: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
});
