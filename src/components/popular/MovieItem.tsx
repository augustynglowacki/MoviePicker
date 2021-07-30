import React, {useRef} from 'react';
import {Text, View, ImageBackground, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {API_IMAGES} from '@env';
import {StyleSheet, Dimensions} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {AUTH, DETAILS} from '../../models/constants/routeNames';
import colors from '../../assets/theme/colors';
import {useSelector} from 'react-redux';
import {genresSelector} from '../../redux/genres/GenresSlice';
import {useTranslation} from 'react-i18next';
import {userThunkSelector} from '../../redux/user/UserSlice';
import RatingBox from '../details/RatingBox';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Genres, Movie} from '../../models';

interface MovieItemProps {
  mergeGenresWithMovies: (Genres | undefined)[];
  movie: Movie;
}

export const BOTTOM_TABS_HEIGHT = Math.floor(
  Dimensions.get('window').height / 12.5,
);

export const MOVIE_HEIGHT = Math.ceil(
  Dimensions.get('window').height - BOTTOM_TABS_HEIGHT,
);

console.log('Movie height', MOVIE_HEIGHT);

const MovieItem = ({movie, mergeGenresWithMovies}: MovieItemProps) => {
  const {loading} = useSelector(genresSelector);
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const {poster_path, overview, title, id, vote_average, isMovie} = movie;
  const doubleTapRef = useRef();
  const {
    user: {email},
  } = useSelector(userThunkSelector);

  const setData = () => {
    const db = firestore(); //should be removed into service
    const userId = auth().currentUser?.uid ?? 'none';
    db.collection('users').doc(userId).collection('likedMovies').add({
      movieId: movie.id,
      title: movie.title,
      vote_average: movie.vote_average,
      poster_path: movie.poster_path,
      overview: movie.overview,
      genre_ids: movie.genre_ids,
      isMovie: movie.isMovie,
    });
  };

  const handleOnActivated = () => {
    if (email !== '') {
      //  TODO:
      setData();
    }
    // do it cleaner
    if (email === '') {
      Alert.alert(t('common:login'), t('common:loginSuggestion'), [
        {
          text: t('common:cancel'),
          onPress: () => {},
        },
        {
          text: t('common:ok'),
          onPress: () => navigate(AUTH),
        },
      ]);
    }
  };

  return (
    <TapGestureHandler
      waitFor={doubleTapRef}
      onActivated={() => {
        navigate(DETAILS, {
          poster_path,
          overview,
          title,
          id,
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
              'rgba(0,0,0,0.6)',
              'rgba(0,0,0,0.4)',
              'rgba(0,0,0,0.4)',
              'rgba(0,0,0,0.4)',
              'rgba(0,0,0,0.4)',
              'rgba(0,0,0,0.4)',
              'rgba(0,0,0,0.4)',
              'rgba(0,0,0,0.4)',
              'rgba(0,0,0,0.65)',
              'rgba(0,0,0,0.75)',
            ]} // remove to const and import it
            start={{x: 0, y: 1}}
            end={{x: 0, y: 0}}
            style={styles.linearGradient}
          />
          <View style={styles.contentContainer}>
            <View style={styles.titles}>
              <Text style={styles.title}>{title}</Text>

              <View style={styles.subtitle}>
                {loading ? (
                  <Text>Loading </Text>
                ) : (
                  mergeGenresWithMovies.slice(0, 2).map((genre: any) => (
                    <View key={genre.name} style={styles.categoryContainer}>
                      <Text style={styles.categoryItem}>{genre.name}</Text>
                    </View>
                  )) // make const
                )}
              </View>
              <RatingBox voteAverage={vote_average} />
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
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
  },
  contentContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titles: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontWeight: '800',
    fontSize: 42,
    marginBottom: 15,
    color: colors.white,
    textAlign: 'center',
  },
  subtitle: {
    maxWidth: 350,
    fontSize: 14,
    letterSpacing: 0.76,
    lineHeight: 21,
    color: colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  categoryContainer: {
    marginRight: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 2,
    backgroundColor: colors.white,
    marginTop: 6,
  },
  categoryItem: {
    color: colors.black,
    fontWeight: '600',
    fontSize: 13,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  linearGradient: {
    height: '100%',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
