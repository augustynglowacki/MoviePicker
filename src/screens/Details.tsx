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

const HEIGHT = Dimensions.get('window').height;

const convertToHours = (time: number) => {
  const hour = Math.round(time / 60);
  const minutes = time % 60;

  return `${hour}h ${minutes}min`;
};

const Details = ({route, navigation}: any) => {
  const distpach = useDispatch();
  const {title, poster_path, id} = route.params;
  const {movieDetails, loading} = useSelector(movieDetailsSelector);

  console.log(movieDetails);

  useEffect(() => {
    distpach(getMovieDetails(id));
    distpach(getMovieActors(id));
  }, [distpach, id]);

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
        <Text style={styles.title}>{title}</Text>
        <View style={styles.movieInfoWrapper}>
          <Text style={styles.movieInfoItem}>{movieDetails.release_date}</Text>
          <Entypo name="dot-single" size={32} color="white" />
          <Text>gentees</Text>
          <Entypo name="dot-single" size={32} color="white" />
          <Text style={styles.movieInfoItem}>
            {convertToHours(movieDetails.runtime)}
          </Text>
        </View>
        <View style={styles.descriptionWrapper}>
          {loading ? (
            <Text>Loading</Text> // TO ADD MATERIAL UI LOADING
          ) : (
            <Text style={styles.descriptionText}>{movieDetails.overview}</Text>
          )}
        </View>
      </View>
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
  title: {
    color: colors.white,
    fontSize: 40,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 15,
  },
  descriptionWrapper: {
    marginTop: 70,
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
  movieInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  movieInfoItem: {
    color: colors.white,
  },
});
