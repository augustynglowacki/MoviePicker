import React, {useRef, useState} from 'react';
import {Text, View, ImageBackground, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {API_IMAGES} from '@env';
import {StyleSheet, Dimensions} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import palette from 'src/styles/palette';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {userThunkSelector} from 'src/redux/user/UserSlice';
import RatingBox from '../details/RatingBox';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Movie} from 'src/models';
import Heart from '../likeHeart/Heart';
import GenreBox from './GenreBox';
import {Route} from 'src/models/constants/routeNames';
interface Props {
  movie: Movie;
}

export const BOTTOM_TABS_HEIGHT = Math.floor(
  Dimensions.get('window').height / 12.5,
);

export const MOVIE_HEIGHT = Math.ceil(
  Dimensions.get('window').height - BOTTOM_TABS_HEIGHT,
);

const MovieItem: React.FC<Props> = ({movie}) => {
  const {t} = useTranslation('common');
  const {navigate} = useNavigation();
  const {poster_path, overview, title, id, vote_average, isMovie, genres} =
    movie;
  const doubleTapRef = useRef();
  const [isLiked, setLiked] = useState<boolean>(false);
  const {
    user: {email},
  } = useSelector(userThunkSelector);

  const setData = () => {
    const db = firestore();
    const userId = auth().currentUser?.uid;
    userId
      ? db.collection('users').doc(userId).collection('favoriteMovies').add({
          movieId: id,
          title,
          vote_average,
          poster_path,
          overview,
          genres,
          isMovie,
        })
      : null;
  };

  const handleOnActivated = () => {
    if (email) {
      if (!isLiked) {
        setLiked(true);
        setData();
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
          poster_path,
          isMovie,
        });
      }}>
      <TapGestureHandler
        maxDelayMs={250}
        ref={doubleTapRef}
        numberOfTaps={2}
        onActivated={handleOnActivated}>
        <View style={styles.movieContainer}>
          <ImageBackground
            source={{uri: `${API_IMAGES}${poster_path}`}}
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
          <View style={styles.movieInfoContainer}>
            <View style={styles.movieInfo}>
              <Text style={styles.title}>{title}</Text>
              <View style={styles.genres}>
                {genres &&
                  genres.slice(0, 2).map(genre => {
                    return (
                      <View key={genre} style={styles.genres}>
                        <GenreBox key={genre} name={genre} />
                      </View>
                    );
                  })}
              </View>
              <RatingBox voteAverage={vote_average} />
              {!!isLiked && <Heart />}
            </View>
          </View>
        </View>
      </TapGestureHandler>
    </TapGestureHandler>
  );
};

export default MovieItem;

export const styles = StyleSheet.create({
  movieContainer: {
    width: '100%',
    height: MOVIE_HEIGHT,
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 160,
  },
  movieInfo: {
    padding: 20,
  },
  title: {
    fontSize: 34,
    color: palette.white,
    textAlign: 'center',
  },
  genres: {
    marginTop: 16,
    maxWidth: 350,
    fontSize: 14,
    color: palette.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
});
