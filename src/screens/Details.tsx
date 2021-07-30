import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import {
  getMovieActors,
  getTvShows,
} from '../redux/movieDetails/movieDetailsActions'; //absolute paths
import ActorsBox from '../components/actors/ActorList';
import RatingBox from '../components/details/RatingBox';
import MovieDetailsInfoBox from '../components/details/DetailsInfoBox';
import {MovieDetails, TvShowsDetails} from '../models';
import {Container} from '../components/common';

const HEIGHT = Dimensions.get('window').height;

// keep screen names like that -> DetailsScreen
const Details = ({route, navigation}: any) => {
  const [active, setActive] = useState<MovieDetails | TvShowsDetails>();
  const distpach = useDispatch(); //install extension for typos
  const {poster_path, id, isMovie} = route.params;
  const {fetchedMovies, fetchedTvShows, movieActors} =
    useSelector(movieDetailsSelector);

  const movie = fetchedMovies[id];
  const show = fetchedTvShows[id];

  useEffect(() => {
    // is this works correctly ? 🤔
    if (isMovie && !fetchedMovies[id]) {
      distpach(getMovieDetails(id));
      distpach(getMovieActors(id));
    } else {
      distpach(getTvShows(id));
    }
  }, [distpach, id, isMovie, fetchedMovies]);

  useEffect(() => {
    setActive(movie ? movie : show); // looks better
  }, [movie, show]);

  if (!show && !movie) {
    // should be loading prop from store
    return <Text>Loading dupa</Text>; // should be loading indicator
  }

  const renderMovieDetails = () => (
    <Container disableSafeArea style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={{uri: `${API_IMAGES}${poster_path}`}}>
        <View style={styles.contentWrapper}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Entypo name="chevron-left" size={35} color={colors.white} />
            </TouchableOpacity>
          </View>
          {/* this gradient looks like separated component */}
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
        <Text style={styles.title}>{active?.title!}</Text> {/*do not use !*/}
        <MovieDetailsInfoBox isMovie={isMovie} data={isMovie ? movie : show} />
        {active?.vote_average ? (
          <RatingBox voteAverage={active?.vote_average} />
        ) : null}{' '}
        {/* use && instead of ? () : () */}
        <View style={styles.descriptionWrapper}>
          <Text style={styles.descriptionText}>{active?.overview}</Text>
        </View>
        <ActorsBox data={movieActors} error="" />
        {/* error should be optional prop */}
      </View>
    </Container>
  );

  // remove this function and return normal JSX
  return <>{renderMovieDetails()}</>;
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.strongBlack,
  },
  title: {
    color: colors.white,
    fontSize: 40,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 15,
  },
  imageBackground: {
    width: '100%',
    height: HEIGHT * 0.6,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? 40 : 30, // u can create helper isIOS
    marginHorizontal: 16,
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
    paddingHorizontal: 14,
    alignSelf: 'center',
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
    paddingHorizontal: 16,
    marginTop: -40,
  },
});
