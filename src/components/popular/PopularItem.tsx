import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Alert,
  Dimensions,
  Image,
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
import {setWatchlist} from 'src/redux/collections/CollectionsActions';
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
  const {
    user: {email},
  } = useSelector(userThunkSelector);

  const addToWatchlist = () => {
    if (email) {
      if (!isLiked) {
        setLiked(true);
        dispatch(setWatchlist(movie));
        setTimeout(() => setLiked(false), 1200);
      }
    } else {
      Alert.alert(t('common:login'), t('common:loginSuggestion'), [
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
    <View style={styles.container}>
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
          maxDelayMs={250}
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
                'rgba(0,0,0,0.15)',
                'rgba(0,0,0,0.3)',
                'rgba(0,0,0,0.5)',
                'rgba(0,0,0,0.65)',
              ]}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              style={styles.linearGradient}
            />
            <View style={styles.movieInfo}>
              <Text style={styles.title}>{title}</Text>
              <View style={styles.genres}>
                {genres.slice(0, 2).map(genre => (
                  <GenreBox key={genre} name={genre} />
                ))}
              </View>
              {!!voteAverage && <RatingBox voteAverage={voteAverage} />}
              {!!isLiked && <Heart />}
            </View>
          </View>
        </TapGestureHandler>
      </TapGestureHandler>
    </View>
  );
});

export default PopularItem;
const {width} = Dimensions.get('screen');
const imageW = width * 0.72;
const imageH = imageW * 1.58;
export const styles = StyleSheet.create({
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
    bottom: 20,
    alignSelf: 'center',
  },
  title: {
    fontSize: 23,
    color: palette.white,
    textAlign: 'center',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
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
});
