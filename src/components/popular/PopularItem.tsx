import React, {useRef, useState} from 'react';
import {Text, View, ImageBackground, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {API_IMAGES} from '@env';
import {StyleSheet} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import palette from 'src/styles/palette';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {userThunkSelector} from 'src/redux/user/UserSlice';
import RatingBox from '../common/RatingBox';
import Heart from '../common/Heart';
import GenreBox from './GenreBox';
import {Route, WINDOW_HEIGHT, BOTTOM_TABS_HEIGHT} from 'src/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import {setData} from 'src/service/firestore/collection';
import {Popular} from 'src/models';
interface Props {
  movie: Popular;
}

const PopularItem: React.FC<Props> = React.memo(({movie}) => {
  const {t} = useTranslation('common');
  const {navigate} = useNavigation();
  const {posterPath, title, id, voteAverage, genres, contentType} = movie;
  const doubleTapRef = useRef();
  const [isLiked, setLiked] = useState<boolean>(false);
  const {
    user: {email},
  } = useSelector(userThunkSelector);

  const addToFavorite = () => {
    if (email) {
      if (!isLiked) {
        setLiked(true);
        setData(movie);
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
        onActivated={addToFavorite}>
        <View style={styles.movieContainer}>
          <ImageBackground
            source={{uri: `${API_IMAGES}${posterPath}`}}
            style={styles.image}
          />
          <LinearGradient
            colors={[
              'rgba(0,0,0,0.5)',
              'rgba(0,0,0,0.4)',
              'rgba(0,0,0,0.4)',
              'rgba(0,0,0,0.4)',
              'rgba(0,0,0,0.4)',
              'rgba(0,0,0,0.4)',
              'rgba(0,0,0,0.4)',
              'rgba(0,0,0,0.4)',
              'rgba(0,0,0,0.65)',
              'rgba(0,0,0,0.75)',
            ]}
            start={{x: 0, y: 1}}
            end={{x: 0, y: 0}}
            style={styles.linearGradient}
          />
          <SafeAreaView style={styles.movieInfoContainer}>
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
          </SafeAreaView>
        </View>
      </TapGestureHandler>
    </TapGestureHandler>
  );
});

export default PopularItem;

export const styles = StyleSheet.create({
  movieContainer: {
    width: '100%',
    height: WINDOW_HEIGHT - BOTTOM_TABS_HEIGHT,
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  linearGradient: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  movieInfoContainer: {
    top: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieInfo: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 33,
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
