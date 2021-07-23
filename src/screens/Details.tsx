import React, {useEffect} from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {API_IMAGES} from '@env';
import {Platform} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../assets/theme/colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  getMovieDetails,
  movieDetailsSelector,
} from '../redux/movieDetails/movieDetailsSlice';
import {getMovieActors} from '../redux/movieDetails/movieDetailsActions';
import ActorsBox from '../components/molecules/ActorsBox';
import RatingBox from '../components/molecules/RatingBox';
import Header from '../components/atoms/Header';
import MovieDetailsInfoBox from '../components/molecules/MovieDetailsInfoBox';

const HEIGHT = Dimensions.get('window').height;

const Details = ({route, navigation}: any) => {
  const distpach = useDispatch();
  const {title, poster_path, id} = route.params;
  const {fetchedMovies, movieActors} = useSelector(movieDetailsSelector);

  const movie = fetchedMovies[id];

  useEffect(() => {
    if (!fetchedMovies[id]) {
      distpach(getMovieDetails(id));
      distpach(getMovieActors(id));
    }
  }, [distpach, id, fetchedMovies]);

  if (!movie) {
    return <Text>Loading</Text>; /// Add peper loading
  }

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={{uri: `${API_IMAGES}${poster_path}`}}>
        <View style={styles.contentWrapper}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Entypo name="chevron-left" size={35} color={colors.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.linearWrapper}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              colors={['transparent', '#000']}
              style={styles.linearGrandient}
            />
          </View>
        </View>
      </ImageBackground>

      <View style={styles.bottomWrapper}>
        <Header title={title} />
        <MovieDetailsInfoBox movie={movie} />
        <RatingBox movie={movie} />
        <View style={styles.descriptionWrapper}>
          <Text style={styles.descriptionText}>{movie.overview}</Text>
        </View>
      </View>
      <ActorsBox data={movieActors} error="" />
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.strongBlack,
  },
  imageBackground: {
    width: '100%',
    height: HEIGHT * 0.6,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? 40 : 30,
    marginHorizontal: 20,
  },
  contentWrapper: {
    flex: 1,
  },
  linearWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  linearGrandient: {
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },

  descriptionWrapper: {
    marginTop: 20,
    marginBottom: 30,
  },
  descriptionText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'justify',
  },

  bottomWrapper: {
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingHorizontal: 30,
    marginTop: -40,
  },
});
